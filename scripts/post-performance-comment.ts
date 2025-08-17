#!/usr/bin/env node

import {readFile} from 'fs/promises';

/**
 * Posts performance comparison report as GitHub comment
 * Uses GitHub Actions context and REST API
 */
async function postPerformanceComment(reportPath: string): Promise<void> {
    const {GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_EVENT_PATH} = process.env;

    if (!GITHUB_TOKEN) {
        console.log('⏭️ No GITHUB_TOKEN found, skipping comment posting');
        return;
    }

    if (!GITHUB_REPOSITORY || !GITHUB_EVENT_PATH) {
        console.log('⏭️ Not running in GitHub Actions context, skipping comment posting');
        return;
    }

    try {
        // Read GitHub event to get PR number
        const eventData = JSON.parse(await readFile(GITHUB_EVENT_PATH, 'utf8'));
        const prNumber = eventData.pull_request?.number;

        if (!prNumber) {
            console.log('⏭️ Not a pull request event, skipping comment posting');
            return;
        }

        // Read performance report
        const reportContent = await readFile(reportPath, 'utf8');

        // Find existing performance comment
        const [owner, repo] = GITHUB_REPOSITORY.split('/');
        const commentsUrl = `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`;

        const headers = {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
        };

        // Get existing comments
        const commentsResponse = await fetch(commentsUrl, {headers});
        const comments = await commentsResponse.json();

        // Find existing performance comment
        const performanceCommentMarker = '## 📊 Performance Metrics Comparison';
        const existingComment = comments.find((comment: any) =>
            comment.body.includes(performanceCommentMarker),
        );

        if (existingComment) {
            // Update existing comment
            const updateUrl = `https://api.github.com/repos/${owner}/${repo}/issues/comments/${existingComment.id}`;
            const updateResponse = await fetch(updateUrl, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({body: reportContent}),
            });

            if (updateResponse.ok) {
                console.log('✅ Updated existing performance comment');
            } else {
                console.error(
                    '❌ Failed to update performance comment:',
                    updateResponse.status,
                );
            }
        } else {
            // Create new comment
            const createResponse = await fetch(commentsUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({body: reportContent}),
            });

            if (createResponse.ok) {
                console.log('✅ Posted new performance comment');
            } else {
                console.error(
                    '❌ Failed to post performance comment:',
                    createResponse.status,
                );
            }
        }
    } catch (error) {
        console.error('❌ Error posting performance comment:', error);
    }
}

// CLI entry point
if (require.main === module) {
    const [, , reportPath] = process.argv;

    if (!reportPath) {
        console.error('Usage: node post-performance-comment.js <report-path>');
        process.exit(1);
    }

    postPerformanceComment(reportPath).catch((error) => {
        console.error('Failed to post performance comment:', error);
        process.exit(1);
    });
}

export {postPerformanceComment};

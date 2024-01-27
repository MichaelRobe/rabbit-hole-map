import { useState } from 'react';
import wikiApi from '../api_wiki/api';
import { blue } from '@mui/material/colors';

const RelatedPageService = {
    getGraph: async (pages, progress, setProgress) => {
        return {
            nodes: getNodes(pages),
            links: await getEdges(pages, progress, setProgress)
        };
    },

    getFilteredWikiPages: (history) => {
        try {
            const excludedExtensions = ['.jpg', '.png', '.gif', 'svg', 'tif'];
    
            const filteredPages = history.filter((page) =>
                page.url.includes('wikipedia.org/wiki/') &&
                excludedExtensions.every((ext) => !page.url.toLowerCase().includes(ext))
            );
    
    
            const uniquePages = filteredPages.filter((page, index, self) =>
                index === self.findIndex((p) => (
                    getWikiTitle(p.url) === getWikiTitle(page.url)
                ))
            );
            return uniquePages;
        } catch (error) {
            console.log(error);
        }
    }
}


async function getContent(pageTitle) {
    try {
        const response = await wikiApi.getContent(pageTitle);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getEdges(pages, setProgress) {
    var edges = [];
    var progress = 1;
    setProgress(progress);

    // Create a promise for each page
    const pagePromises = pages.map(async (page) => {
        try {
            const wikiTitle = getWikiTitle(page.url);
            const content = await getContent(wikiTitle);
            const relatedPages = getRelatedPages(content);
            const visitedRelatedPages = getVisitedRelatedPages(relatedPages, pages);

            visitedRelatedPages.forEach((visitedRelatedPage) => {
                edges.push({ source: wikiTitle, target: visitedRelatedPage });
            });

            // Update the progress state
            setProgress(progress++);
        } catch (error) {
            console.log(error);
        }
    });

    // Wait for all promises to resolve before continuing
    await Promise.all(pagePromises);
    return edges;
}



function getNodes(pages) {
    try {
        return pages.map((page) => { return { id: getWikiTitle(page.url) } })
    } catch (error) {
        console.log(error);
    }
}

function getWikiTitle(pageUrl) {
    try {
        const wikiTitleWithHash = pageUrl.split('/').pop();
        const wikiTitle = wikiTitleWithHash.split('#')[0];
        return wikiTitle;
    } catch (error) {
        console.log(error);
    }
}


function getRelatedPages(pageContent) {
    try {
        if (!pageContent || !pageContent.parse || !pageContent.parse.links) {
            return [];
        }
        const relatedPages = [];

        pageContent.parse.links.forEach(link => {
            relatedPages.push(link['*']);
        });

        return relatedPages;
    } catch (error) {
        console.log(error);
    }
}

function getVisitedRelatedPages(relatedPages, visitedPages) {
    try {
        const visitedSet = new Set(visitedPages.map(page => getWikiTitle(page.url)));

        const relatedVisitedPages = relatedPages.filter(
            relatedPage => visitedSet.has(relatedPage)
        );

        return relatedVisitedPages;
    } catch (error) {
        console.log(error);
    }
}




export default RelatedPageService;
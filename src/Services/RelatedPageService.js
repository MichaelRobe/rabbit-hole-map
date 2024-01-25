import { useState } from 'react';
import wikiApi from '../api_wiki/api';
import { blue } from '@mui/material/colors';

const RelatedPageService = {
    getGraph: async (pages) => {
        return {
            nodes: getNodes(pages),
            links: await getEdges(pages)
        };
    },

    getFilteredWikiPages: (history) => {
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

async function getEdges(pages) {
    var edges = [];
    // Create a promise for each page
    const pagePromises = pages.map(async (page) => {
        const wikiTitle = getWikiTitle(page.url);
        const content = await getContent(wikiTitle);
        const relatedPages = getRelatedPages(content);
        const visitedRelatedPages = getVisitedRelatedPages(relatedPages, pages);

        visitedRelatedPages.forEach((visitedRelatedPage) => {
            edges.push({ source: wikiTitle, target: visitedRelatedPage });
        });
    });

    // Wait for all promises to resolve before continuing
    await Promise.all(pagePromises);
    return edges;
}

function getNodes(pages) {
    return pages.map((page) => { return { id: getWikiTitle(page.url) } })
}

function getWikiTitle(pageUrl) {
    const wikiTitleWithHash = pageUrl.split('/').pop();
    const wikiTitle = wikiTitleWithHash.split('#')[0];
    return wikiTitle;
}

function getRelatedPages(pageContent) {
    if (!pageContent || !pageContent.parse || !pageContent.parse.links) {
        return [];
    }
    const relatedPages = [];

    pageContent.parse.links.forEach(link => {
        relatedPages.push(link['*']);
    });

    return relatedPages;
}

function getVisitedRelatedPages(relatedPages, visitedPages) {
    const visitedSet = new Set(visitedPages.map(page => getWikiTitle(page.url)));
    
    const relatedVisitedPages = relatedPages.filter(
        relatedPage => visitedSet.has(relatedPage)
    );
    
    return relatedVisitedPages;
}



export default RelatedPageService;
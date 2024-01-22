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
        const filteredPages = history.filter((page) =>
            page.url.includes('wikipedia.org/wiki/')
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
    await pages.forEach(async (page) => {

        const wikiTitle = getWikiTitle(page.url)
        const content = await getContent(wikiTitle);
        const relatedPages = getRelatedPages(content);
        const visitedRelatedPages = getVisitedPages(relatedPages, pages);

        visitedRelatedPages.forEach((visitedRelatedPage) => {
            edges.push({ source: wikiTitle, target: visitedRelatedPage });
        });
    });
    return edges;
}

function getNodes(pages) {
    return pages.map((page) => { return { id: getWikiTitle(page.url)}})
}

function getWikiTitle(pageUrl) {
    const wikiTitle = pageUrl.split('/').pop();
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

function getVisitedPages(relatedPages, pages) {
    var visitedPages = [];

    visitedPages = relatedPages.filter(
        (relatedPage) => {
            return pages.some(
                (page) => getWikiTitle(page.url) == relatedPage
            );
        }
    );

    return visitedPages;
}



export default RelatedPageService;
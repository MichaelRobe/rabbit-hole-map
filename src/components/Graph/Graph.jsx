import { ForceGraph2D } from 'react-force-graph';
import RelatedPageService from "../../Services/RelatedPageService";
import { useEffect, useState } from "react";

const GraphComponent = ({ pages }) => {

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const getGraph = async () => {
      const graph = await RelatedPageService.getGraph(pages)
      console.log("graph", graph);
      setTimeout(
        () => {
          setGraphData(graph);
        },
        1000
      )
    }

    getGraph();
    console.log("graphData", graphData);
  }, [pages]);


  return (
    <ForceGraph2D
      graphData={graphData}
      linkWidth={2}
      linkColor={() => 'rgba(255,255,255,0.2)'}
      nodeLabel={(node) => node.id}
      nodeAutoColorBy={(node) => node.id}
      linkDirectionalParticles={2}
      linkDirectionalParticleWidth={2}
      linkDirectionalParticleSpeed={0.005}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.id;
        const fontSize = 12/globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = node.color;
        ctx.fillText(label, node.x, node.y);

        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
      }}
      nodePointerAreaPaint={(node, color, ctx) => {
        ctx.fillStyle = color;
        const bckgDimensions = node.__bckgDimensions;
        bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
      }}
    />

  );
};

export default GraphComponent;
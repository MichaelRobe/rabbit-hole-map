import { ForceGraph2D, ForceGraph3D } from 'react-force-graph';
import RelatedPageService from "../../Services/RelatedPageService";
import { useEffect, useState } from "react";
import SpriteText from 'three-spritetext';

// Graph Component
const GraphComponent = ({ pages, isGraph3D }) => {

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const getGraph = async () => {
      const graph = await RelatedPageService.getGraph(pages);
      setGraphData(graph);
    }
    getGraph();
  }, [pages]);


  return (
    isGraph3D ?
      <ForceGraph3D
        graphData={graphData}
        linkWidth={2}
        nodeLabel={(node) => node.id}
        nodeAutoColorBy={(node) => node.id}
        linkAutoColorBy={(link) => link.source}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}

        nodeThreeObjectExtend={true}
        nodeThreeObject={node => {
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = 8;
          return sprite;
        }}
        onNodeDragEnd={node => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
      />
      :
      <ForceGraph2D
        graphData={graphData}
        nodeAutoColorBy={(node) => node.id}
        linkAutoColorBy={(link) => link.source}
        linkWidth={2}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        backgroundColor='#000011'
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;
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
        onNodeDragEnd={node => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
      />


  );
};

export default GraphComponent;
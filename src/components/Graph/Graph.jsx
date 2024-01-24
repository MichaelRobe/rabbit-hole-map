import { ForceGraph2D, ForceGraph3D } from 'react-force-graph';
import RelatedPageService from "../../Services/RelatedPageService";
import { useEffect, useState } from "react";
import SpriteText from 'three-spritetext';

// Graph Component
const GraphComponent = ({ pages }) => {

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const getGraph = async () => {
        const graph = await RelatedPageService.getGraph(pages);
        setGraphData(graph);
    }
    getGraph();
  }, [pages]);


  return (
    <ForceGraph3D
      graphData={graphData}
      linkWidth={2}
      linkColor={() => 'rgba(255,255,255,0.2)'}
      nodeLabel={(node) => node.id}
      nodeAutoColorBy={(node) => node.id}
      linkDirectionalParticles={2}
      linkDirectionalParticleWidth={2}
      linkDirectionalParticleSpeed={0.005}
      
      nodeThreeObjectExtend={true}
      nodeThreeObject={node => {
        const sprite = new SpriteText(node.id);
        sprite.color = node.color;
        sprite.textHeight = 8;
        return sprite;
      }}
      
    />

  );
};

export default GraphComponent;
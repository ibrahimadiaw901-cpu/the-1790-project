'use client';

import { useNav } from '@/lib/nav';

/**
 * GraphCanvas — shared connections panel.
 * Renders a center node with relationship clusters radiating outward.
 * Clicking a satellite node navigates to that entity's EntityGraphPage.
 */

export type GraphNode = {
  id: string;
  label: string;
  type: DoorTarget;
  sublabel?: string;
};

export type GraphCluster = {
  label: string; // edge label, e.g. "Serves on"
  nodes: GraphNode[];
};

type DoorTarget = 'member' | 'bill' | 'subject' | 'committee' | 'agency' | 'executive' | 'rant' | 'concern';

const nodeColors: Record<string, string> = {
  member: '#244e68',
  bill: '#4e875b',
  subject: '#7c5a9e',
  committee: '#c7873f',
  agency: '#5a6b7a',
  executive: '#bb4937',
  rant: '#bb4937',
  concern: '#244e68',
};

const routeForType: Record<string, (id: string) => import('@/lib/nav').Route> = {
  member: (id) => ({ name: 'member', id }),
  bill: (id) => ({ name: 'bill', id }),
  subject: (id) => ({ name: 'subject', id }),
  committee: (id) => ({ name: 'committee', id }),
  agency: (id) => ({ name: 'agency', id }),
  executive: (id) => ({ name: 'executive', id }),
  rant: (id) => ({ name: 'rant', id }),
  concern: (id) => ({ name: 'concern', id }),
};

export function GraphCanvas({ centerNode, clusters }: { centerNode: GraphNode; clusters: GraphCluster[] }) {
  const { navigate } = useNav();

  return (
    <div className="overflow-auto rounded-xl bg-[#f8f9fb] p-4">
      <svg viewBox="0 0 800 600" className="h-[500px] w-full">
        {/* Edges */}
        {clusters.map((cluster, ci) => {
          const angle = (ci / clusters.length) * 2 * Math.PI - Math.PI / 2;
          const clusterX = 400 + Math.cos(angle) * 220;
          const clusterY = 300 + Math.sin(angle) * 220;
          return (
            <g key={`cluster-${ci}`}>
              <line x1={400} y1={300} x2={clusterX} y2={clusterY} stroke="#cfd8de" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x={(400 + clusterX) / 2} y={(300 + clusterY) / 2 - 5} textAnchor="middle" className="fill-[#82909a]" style={{ fontSize: '10px', fontWeight: 600 }}>
                {cluster.label}
              </text>
              {cluster.nodes.map((node, ni) => {
                const nodeAngle = angle + (ni - (cluster.nodes.length - 1) / 2) * 0.15;
                const nodeRadius = 280;
                const nx = 400 + Math.cos(nodeAngle) * nodeRadius;
                const ny = 300 + Math.sin(nodeAngle) * nodeRadius;
                return <line key={`edge-${ci}-${ni}`} x1={clusterX} y1={clusterY} x2={nx} y2={ny} stroke="#dbe1e5" strokeWidth="1" />;
              })}
            </g>
          );
        })}

        {/* Satellite nodes */}
        {clusters.map((cluster, ci) => {
          const angle = (ci / clusters.length) * 2 * Math.PI - Math.PI / 2;
          return cluster.nodes.map((node, ni) => {
            const nodeAngle = angle + (ni - (cluster.nodes.length - 1) / 2) * 0.15;
            const nodeRadius = 280;
            const nx = 400 + Math.cos(nodeAngle) * nodeRadius;
            const ny = 300 + Math.sin(nodeAngle) * nodeRadius;
            const color = nodeColors[node.type] ?? '#52636f';
            return (
              <g key={`node-${ci}-${ni}`} className="cursor-pointer" onClick={() => { const r = routeForType[node.type]?.(node.id); if (r) navigate(r); }}>
                <circle cx={nx} cy={ny} r="24" fill={color} fillOpacity={0.12} stroke={color} strokeWidth="2" />
                <text x={nx} y={ny - 1} textAnchor="middle" style={{ fontSize: '9px', fontWeight: 700, fill: '#17202a' }}>
                  {node.label.length > 18 ? node.label.slice(0, 16) + '…' : node.label}
                </text>
                {node.sublabel && (
                  <text x={nx} y={ny + 10} textAnchor="middle" style={{ fontSize: '7px', fontWeight: 600, fill: '#7b8992' }}>{node.sublabel}</text>
                )}
              </g>
            );
          });
        })}

        {/* Center node */}
        <g>
          <circle cx={400} cy={300} r={40} fill={nodeColors[centerNode.type] ?? '#bb4937'} fillOpacity={0.15} stroke={nodeColors[centerNode.type] ?? '#bb4937'} strokeWidth="2.5" />
          <text x={400} y={298} textAnchor="middle" style={{ fontSize: '11px', fontWeight: 700, fill: '#17202a' }}>
            {centerNode.label.length > 28 ? centerNode.label.slice(0, 26) + '…' : centerNode.label}
          </text>
          {centerNode.sublabel && (
            <text x={400} y={312} textAnchor="middle" style={{ fontSize: '9px', fontWeight: 600, fill: '#7b8992' }}>{centerNode.sublabel}</text>
          )}
        </g>
      </svg>
    </div>
  );
}

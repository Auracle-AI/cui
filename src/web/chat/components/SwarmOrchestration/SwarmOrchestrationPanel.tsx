import React from 'react';
import { Users, Brain, Zap, Activity } from 'lucide-react';

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'completed';
  currentTask?: string;
}

export interface SwarmState {
  isActive: boolean;
  totalAgents: number;
  activeAgents: number;
  currentOperation?: string;
  agents: AgentInfo[];
}

interface SwarmOrchestrationPanelProps {
  swarmState: SwarmState;
}

export function SwarmOrchestrationPanel({ swarmState }: SwarmOrchestrationPanelProps) {
  if (!swarmState.isActive) {
    return null;
  }

  return (
    <div className="border border-blue-500/30 bg-blue-500/5 rounded-lg p-4 mb-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-2 mb-3">
        <Users className="text-blue-500" size={20} />
        <h3 className="font-semibold text-blue-600 dark:text-blue-400">
          Swarm Orchestration Active
        </h3>
        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          <Activity className="animate-pulse text-green-500" size={14} />
          <span>{swarmState.activeAgents} / {swarmState.totalAgents} agents active</span>
        </div>
      </div>

      {swarmState.currentOperation && (
        <div className="mb-3 text-sm text-muted-foreground flex items-center gap-2">
          <Zap size={14} className="text-yellow-500" />
          <span>Operation: {swarmState.currentOperation}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {swarmState.agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}

interface AgentCardProps {
  agent: AgentInfo;
}

function AgentCard({ agent }: AgentCardProps) {
  const statusColors = {
    active: 'border-green-500/50 bg-green-500/10',
    idle: 'border-gray-500/50 bg-gray-500/10',
    completed: 'border-blue-500/50 bg-blue-500/10',
  };

  const statusDots = {
    active: 'bg-green-500 animate-pulse',
    idle: 'bg-gray-500',
    completed: 'bg-blue-500',
  };

  return (
    <div className={`border rounded p-2 ${statusColors[agent.status]}`}>
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2 h-2 rounded-full ${statusDots[agent.status]}`} />
        <Brain size={14} className="text-muted-foreground" />
        <span className="text-xs font-medium truncate">{agent.name}</span>
      </div>
      <div className="text-xs text-muted-foreground truncate">{agent.role}</div>
      {agent.currentTask && (
        <div className="text-xs text-muted-foreground mt-1 truncate">
          {agent.currentTask}
        </div>
      )}
    </div>
  );
}

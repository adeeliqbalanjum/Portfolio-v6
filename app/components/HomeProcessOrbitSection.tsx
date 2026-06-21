"use client";

import * as React from "react";
import {
  ArrowRight,
  Code2,
  FileText,
  Link2,
  MonitorCheck,
  Rocket,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";

type TimelineItem = {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
};

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Understand",
    date: "01",
    content: "Goals, pages, features, references, budget, timeline, and conversion path are clarified first.",
    category: "Client brief",
    icon: Search,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Plan",
    date: "02",
    content: "WordPress stack, plugins, sections, custom logic, responsive behavior, and editing needs are mapped.",
    category: "Build map",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 88,
  },
  {
    id: 3,
    title: "Build",
    date: "03",
    content: "UI, templates, forms, WooCommerce flows, animations, integrations, and business logic are built cleanly.",
    category: "Development",
    icon: Code2,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 72,
  },
  {
    id: 4,
    title: "Polish",
    date: "04",
    content: "Mobile, speed, forms, links, checkout, browser behavior, and final details are tested before handover.",
    category: "QA check",
    icon: ShieldCheck,
    relatedIds: [3, 5],
    status: "pending",
    energy: 56,
  },
  {
    id: 5,
    title: "Launch",
    date: "05",
    content: "The site is deployed, verified live, and handed over as an editable WordPress system.",
    category: "Go live",
    icon: Rocket,
    relatedIds: [4],
    status: "pending",
    energy: 40,
  },
];

function getStatusLabel(status: TimelineItem["status"]) {
  if (status === "completed") return "COMPLETE";
  if (status === "in-progress") return "IN PROGRESS";
  return "PENDING";
}

function getStatusClass(status: TimelineItem["status"]) {
  if (status === "completed") return "is-complete";
  if (status === "in-progress") return "is-progress";
  return "is-pending";
}

export function HomeProcessOrbitSection() {
  const [expandedItems, setExpandedItems] = React.useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = React.useState<number>(0);
  const [autoRotate, setAutoRotate] = React.useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = React.useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const orbitRef = React.useRef<HTMLDivElement>(null);
  const nodeRefs = React.useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === containerRef.current || event.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = React.useCallback((itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  }, []);

  const centerViewOnNode = React.useCallback((nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  }, []);

  const toggleItem = React.useCallback((id: number) => {
    setExpandedItems((prev) => {
      const nextState = { ...prev };

      Object.keys(nextState).forEach((key) => {
        if (Number(key) !== id) {
          nextState[Number(key)] = false;
        }
      });

      nextState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const nextPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relatedId) => {
          nextPulseEffect[relatedId] = true;
        });
        setPulseEffect(nextPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return nextState;
    });
  }, [centerViewOnNode, getRelatedItems]);

  React.useEffect(() => {
    if (!autoRotate) return;

    const rotationTimer = window.setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);

    return () => window.clearInterval(rotationTimer);
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, angle, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  return (
    <section className="home-process-orbit" aria-label="Process">
      <div className="home-process-terminal" ref={containerRef} onClick={handleContainerClick}>
        <div className="home-process-terminal-inner">
          <div
            className="home-process-orbit-field"
            ref={orbitRef}
            style={{ perspective: "1000px" }}
          >
            <div className="home-process-center-node">
              <div className="home-process-center-ping home-process-center-ping-one" />
              <div className="home-process-center-ping home-process-center-ping-two" />
              <div className="home-process-center-core" />
            </div>

            <div className="home-process-orbit-ring" />

            {timelineData.map((item, index) => {
              const position = calculateNodePosition(index, timelineData.length);
              const isExpanded = expandedItems[item.id];
              const isRelated = isRelatedToActive(item.id);
              const isPulsing = pulseEffect[item.id];
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  ref={(element) => {
                    nodeRefs.current[item.id] = element;
                  }}
                  className="home-process-node-wrap"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    zIndex: isExpanded ? 200 : position.zIndex,
                    opacity: isExpanded ? 1 : position.opacity,
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleItem(item.id);
                  }}
                >
                  <div
                    className={`home-process-node-glow ${isPulsing ? "is-pulsing" : ""}`}
                    style={{
                      width: `${item.energy * 0.5 + 40}px`,
                      height: `${item.energy * 0.5 + 40}px`,
                      left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                      top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    }}
                  />

                  <button
                    type="button"
                    className={`home-process-node ${isExpanded ? "is-expanded" : ""} ${isRelated ? "is-related" : ""}`}
                    aria-label={`Open ${item.title} process step`}
                  >
                    <Icon size={16} />
                  </button>

                  <div className={`home-process-node-label ${isExpanded ? "is-expanded" : ""}`}>
                    {item.title}
                  </div>

                  {isExpanded && (
                    <article className="home-process-expanded-card">
                      <div className="home-process-card-connector" />
                      <div className="home-process-expanded-header">
                        <span className={`home-process-status ${getStatusClass(item.status)}`}>
                          {getStatusLabel(item.status)}
                        </span>
                        <span className="home-process-date">{item.date}</span>
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.content}</p>

                      <div className="home-process-energy">
                        <div>
                          <Zap size={10} />
                          <span>Energy Level</span>
                        </div>
                        <strong>{item.energy}%</strong>
                      </div>

                      <div className="home-process-energy-bar">
                        <span style={{ width: `${item.energy}%` }} />
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="home-process-related">
                          <div className="home-process-related-title">
                            <Link2 size={10} />
                            <span>Connected Nodes</span>
                          </div>
                          <div className="home-process-related-buttons">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((timelineItem) => timelineItem.id === relatedId);
                              if (!relatedItem) return null;

                              return (
                                <button
                                  key={relatedId}
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem.title}
                                  <ArrowRight size={8} />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </article>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

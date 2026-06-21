"use client";

import * as React from "react";
import { ArrowRight, Calendar, Code2, FileText, Link2, MonitorCheck, Rocket, Zap } from "lucide-react";

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
    title: "Discover",
    date: "Step 01",
    content: "Clarify the business goal, sitemap, references, required pages, conversion path, and editing needs before design or development starts.",
    category: "Strategy",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Step 02",
    content: "Plan the UI direction, responsive structure, Elementor sections, ACF fields, WooCommerce flow, and custom plugin logic.",
    category: "UX + Architecture",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Build",
    date: "Step 03",
    content: "Create the WordPress pages, templates, forms, booking logic, animations, integrations, and client-manageable admin settings.",
    category: "Development",
    icon: Code2,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 68,
  },
  {
    id: 4,
    title: "Test",
    date: "Step 04",
    content: "Check mobile layouts, forms, links, checkout behavior, booking totals, browser issues, performance, and edge cases.",
    category: "QA",
    icon: MonitorCheck,
    relatedIds: [3, 5],
    status: "pending",
    energy: 42,
  },
  {
    id: 5,
    title: "Launch",
    date: "Step 05",
    content: "Deploy the final site, confirm live behavior, prepare handover notes, and leave the build editable, fast, and responsive.",
    category: "Release",
    icon: Rocket,
    relatedIds: [4],
    status: "pending",
    energy: 24,
  },
];

function getStatusLabel(status: TimelineItem["status"]) {
  if (status === "completed") return "Complete";
  if (status === "in-progress") return "In progress";
  return "Pending";
}

function getStatusClass(status: TimelineItem["status"]) {
  if (status === "completed") return "is-complete";
  if (status === "in-progress") return "is-progress";
  return "is-pending";
}

export function HomeProcessOrbitSection() {
  const [expandedItems, setExpandedItems] = React.useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = React.useState(0);
  const [autoRotate, setAutoRotate] = React.useState(true);
  const [pulseEffect, setPulseEffect] = React.useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLElement>(null);
  const orbitRef = React.useRef<HTMLDivElement>(null);
  const nodeRefs = React.useRef<Record<number, HTMLDivElement | null>>({});

  React.useEffect(() => {
    if (!autoRotate) return;

    const rotationTimer = window.setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.26) % 360).toFixed(3)));
    }, 50);

    return () => window.clearInterval(rotationTimer);
  }, [autoRotate]);

  const getRelatedItems = React.useCallback((itemId: number) => {
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
      const nextState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        if (Number(key) !== id) nextState[Number(key)] = false;
      });

      nextState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const nextPulse: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          nextPulse[relId] = true;
        });
        setPulseEffect(nextPulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return nextState;
    });
  }, [centerViewOnNode, getRelatedItems]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 235;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.45, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number) => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const resetOrbit = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === containerRef.current || event.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  return (
    <section ref={containerRef} className="home-process-orbit home-process-radial" aria-label="Process" onClick={resetOrbit}>
      <div className="home-process-radial-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="home-process-radial-head">
        <div className="eyebrow">Process</div>
        <h2>How I move from idea to polished launch</h2>
        <p>
          A clean WordPress delivery system for websites, WooCommerce stores, custom plugins, performance cleanup, and editable client handover.
        </p>
      </div>

      <div className="home-process-radial-stage">
        <div className="home-process-radial-orbit" ref={orbitRef}>
          <div className="home-process-radial-core">
            <span>Launch</span>
            <strong>WordPress system</strong>
            <small>Editable · Fast · Responsive</small>
          </div>

          <div className="home-process-radial-ring home-process-radial-ring-one" />
          <div className="home-process-radial-ring home-process-radial-ring-two" />
          <div className="home-process-radial-ring home-process-radial-ring-three" />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = !!expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className={`home-process-node-wrap ${isExpanded ? "is-expanded" : ""}`}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 220 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`home-process-node-pulse ${isPulsing ? "is-pulsing" : ""}`}
                  style={{ width: `${item.energy * 0.56 + 42}px`, height: `${item.energy * 0.56 + 42}px` }}
                />

                <button
                  className={`home-process-node ${isExpanded ? "is-expanded" : ""} ${isRelated ? "is-related" : ""}`}
                  type="button"
                  aria-label={`View ${item.title} process step`}
                >
                  <Icon size={18} strokeWidth={2.4} />
                </button>

                <div className={`home-process-node-label ${isExpanded ? "is-expanded" : ""}`}>{item.title}</div>

                {isExpanded && (
                  <article className="home-process-expanded-card">
                    <div className="home-process-card-arrow" />
                    <div className="home-process-expanded-top">
                      <span className={`home-process-status ${getStatusClass(item.status)}`}>{getStatusLabel(item.status)}</span>
                      <span className="home-process-date">{item.date}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    <div className="home-process-energy">
                      <div>
                        <Zap size={12} />
                        <span>Focus level</span>
                      </div>
                      <strong>{item.energy}%</strong>
                    </div>
                    <div className="home-process-energy-bar"><span style={{ width: `${item.energy}%` }} /></div>
                    {item.relatedIds.length > 0 && (
                      <div className="home-process-related">
                        <div className="home-process-related-title">
                          <Link2 size={12} />
                          <span>Connected steps</span>
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
                                <ArrowRight size={10} />
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

      <div className="home-process-mobile-list" aria-label="Process list">
        {timelineData.map((item) => {
          const Icon = item.icon;
          return (
            <article className="home-process-mobile-card" key={item.id}>
              <span><Icon size={18} /> {item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { ArrowRight, Calendar, Code2, FileText, Link2, MonitorCheck, Rocket, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

type TimelineItem = {
  id: number;
  num: string;
  title: string;
  date: string;
  content: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
};

const timelineData: TimelineItem[] = [
  {
    id: 1,
    num: "01",
    title: "Understand",
    date: "Client brief",
    content: "Goals, pages, features, references, budget, and conversion path are clarified first.",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    num: "02",
    title: "Plan",
    date: "Build map",
    content: "WordPress stack, plugins, sections, custom logic, responsiveness, and editing needs are mapped.",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 88,
  },
  {
    id: 3,
    num: "03",
    title: "Build",
    date: "Development",
    content: "UI, templates, forms, WooCommerce flows, animations, integrations, and business logic are built.",
    icon: Code2,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 66,
  },
  {
    id: 4,
    num: "04",
    title: "Polish",
    date: "QA check",
    content: "Mobile, speed, forms, links, checkout, browser behavior, and final details are tested.",
    icon: MonitorCheck,
    relatedIds: [3, 5],
    status: "pending",
    energy: 42,
  },
  {
    id: 5,
    num: "05",
    title: "Launch",
    date: "Go live",
    content: "The site is deployed, verified live, and handed over as an editable WordPress system.",
    icon: Rocket,
    relatedIds: [4],
    status: "pending",
    energy: 24,
  },
];

function getStatusLabel(status: TimelineItem["status"]) {
  if (status === "completed") return "Ready";
  if (status === "in-progress") return "Active";
  return "Next";
}

function getStatusClass(status: TimelineItem["status"]) {
  if (status === "completed") return "is-complete";
  if (status === "in-progress") return "is-progress";
  return "is-pending";
}

export function HomeProcessOrbitSection() {
  const ref = React.useRef<HTMLElement>(null);
  const orbitRef = React.useRef<HTMLDivElement>(null);
  const [expandedItems, setExpandedItems] = React.useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = React.useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = React.useState(0);
  const [autoRotate, setAutoRotate] = React.useState(false);
  const [pulseEffect, setPulseEffect] = React.useState<Record<number, boolean>>({});

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 18%"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.94, 1, 1, 0.96]);

  React.useEffect(() => {
    if (!autoRotate) return;

    const rotationTimer = window.setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.18) % 360).toFixed(3)));
    }, 50);

    return () => window.clearInterval(rotationTimer);
  }, [autoRotate]);

  const getRelatedItems = React.useCallback((itemId: number) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  }, []);

  const centerViewOnNode = React.useCallback((nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
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
        const nextPulse: Record<number, boolean> = {};
        getRelatedItems(id).forEach((relId) => {
          nextPulse[relId] = true;
        });
        setPulseEffect(nextPulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(false);
        setPulseEffect({});
      }

      return nextState;
    });
  }, [centerViewOnNode, getRelatedItems]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 228;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.78, Math.min(1, 0.78 + 0.22 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number) => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const resetOrbit = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(false);
      setRotationAngle(0);
    }
  };

  return (
    <section ref={ref} className="home-process-orbit" aria-label="Process">
      <div className="home-process-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="home-process-shell">
        <motion.div
          className="home-process-copy"
          initial={{ y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="eyebrow">Process</div>
          <h2>How I move from idea to polished launch</h2>
          <p>
            Every website build moves around one core goal: a fast, editable, responsive WordPress system that clients can actually use after launch.
          </p>
          <div className="home-process-mini-list">
            <span>Clear workflow</span>
            <span>Client-ready handover</span>
            <span>Click each step</span>
          </div>
        </motion.div>

        <motion.div className="home-process-stage" style={{ scale }}>
          <div className="home-process-core">
            <span>Launch</span>
            <strong>WordPress system</strong>
            <small>Editable · Fast · Responsive</small>
          </div>

          <div className="home-process-orbit-wheel" ref={orbitRef} onClick={resetOrbit}>
            <div className="home-process-ring home-process-ring-one" />
            <div className="home-process-ring home-process-ring-two" />
            <div className="home-process-ring home-process-ring-three" />

            {timelineData.map((item, index) => {
              const position = calculateNodePosition(index, timelineData.length);
              const isExpanded = !!expandedItems[item.id];
              const isRelated = isRelatedToActive(item.id);
              const isPulsing = pulseEffect[item.id];
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
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
                    style={{ width: `${item.energy * 0.42 + 52}px`, height: `${item.energy * 0.42 + 52}px` }}
                  />

                  <button
                    className={`home-process-step-card ${isExpanded ? "is-expanded" : ""} ${isRelated ? "is-related" : ""}`}
                    type="button"
                    aria-label={`View ${item.title} process step`}
                  >
                    <span className="home-process-step-top">
                      <span className="home-process-step-icon"><Icon size={17} strokeWidth={2.4} /></span>
                      <span className="home-process-step-num">{item.num}</span>
                    </span>
                    <span className="home-process-step-label">{item.date}</span>
                    <strong>{item.title}</strong>
                    <em>{item.content}</em>
                  </button>

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
                          <span>Client clarity</span>
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
        </motion.div>
      </div>
    </section>
  );
}

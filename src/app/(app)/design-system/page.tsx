"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Volume2,
  Bell,
  CheckCircle,
  Zap,
  Flame,
  Eye,
  Sliders,
} from "lucide-react";
import styles from "./design-system.module.css";
import {
  Button,
  Card,
  Badge,
  Avatar,
  ProgressBar,
  Input,
  Textarea,
  Switch,
  Checkbox,
  Select,
  Tooltip,
  Skeleton,
  Tabs,
  Accordion,
  Stack,
  Divider,
  Modal,
  Drawer,
} from "@/components/ui";
import { toast } from "@/stores/toast.store";
import { useAudioStore } from "@/stores/audio.store";
import {
  fireVictoryConfetti,
  fireStreakFireworks,
  fireHeartRefillConfetti,
} from "@/lib/confetti";

const COLOR_SWATCHES = [
  { name: "Duolingo Green", varName: "--duo-green", color: "#58cc02" },
  { name: "Duolingo Blue", varName: "--duo-blue", color: "#1cb0f6" },
  { name: "Duolingo Red", varName: "--duo-red", color: "#ff4b4b" },
  { name: "Duolingo Yellow", varName: "--duo-yellow", color: "#ffc800" },
  { name: "Duolingo Orange", varName: "--duo-orange", color: "#ff9600" },
  { name: "Duolingo Purple", varName: "--duo-purple", color: "#ce82ff" },
  { name: "Kahoot Red", varName: "--kahoot-red", color: "#e21b3c" },
  { name: "Kahoot Blue", varName: "--kahoot-blue", color: "#1368ce" },
  { name: "Kahoot Yellow", varName: "--kahoot-yellow", color: "#ffa602" },
  { name: "Kahoot Green", varName: "--kahoot-green", color: "#26890c" },
  { name: "Surface Primary", varName: "--bg-primary", color: "#0b0f19" },
  { name: "Surface Secondary", varName: "--bg-secondary", color: "#111827" },
];

export default function DesignSystemPage() {
  const { playPop, playSuccess, playError, playFanfare, playTick } =
    useAudioStore();

  // State for interactive playground controls
  const [switchVal, setSwitchVal] = useState(true);
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [selectVal, setSelectVal] = useState("gold");
  const [textInputVal, setTextInputVal] = useState("Konnichiwa");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drawerVariant, setDrawerVariant] = useState<
    "success" | "error" | null
  >(null);

  // Tab 1: Foundations
  const foundationsContent = (
    <Stack gap="xl">
      <div>
        <h2 className={styles.sectionTitle}>Brand & Palette Tokens</h2>
        <p className={styles.sectionDescription}>
          Curated HSL tailored tokens designed for contrast, 3D tactile bevels,
          and gamified dopamine triggers.
        </p>
        <div className={styles.swatchGrid}>
          {COLOR_SWATCHES.map((swatch) => (
            <div key={swatch.varName} className={styles.swatchCard}>
              <div
                className={styles.swatchColor}
                style={
                  { "--swatch-color": swatch.color } as React.CSSProperties
                }
              />
              <div className={styles.swatchInfo}>
                <span className={styles.swatchName}>{swatch.name}</span>
                <span className={styles.swatchVar}>{swatch.varName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider label="TACTILE PHYSICS & DEPTH" />

      <div>
        <h2 className={styles.sectionTitle}>Tactile 3D Bevel System</h2>
        <p className={styles.sectionDescription}>
          Every interactive element provides physical tactile compression (4px
          shadow compressed to 1px on press).
        </p>
        <Stack direction="horizontal" gap="md" wrap>
          <Button variant="duo" size="lg">
            4px Bevel (Default)
          </Button>
          <Button variant="kahoot" size="lg">
            Kahoot Bevel
          </Button>
          <Button variant="secondary" size="lg">
            Secondary Bevel
          </Button>
          <Button variant="danger" size="lg">
            Danger Bevel
          </Button>
        </Stack>
      </div>
    </Stack>
  );

  // Tab 2: Interactive Components
  const componentsContent = (
    <div className={styles.demoGrid}>
      {/* 1. Buttons */}
      <Card padding="md" className={styles.demoCard}>
        <div className={styles.demoHeader}>
          <span className={styles.demoTitle}>Button Primitives</span>
          <Badge variant="duo" size="sm">
            Tactile
          </Badge>
        </div>
        <div className={styles.demoCanvas}>
          <Button variant="duo" size="sm">
            Small
          </Button>
          <Button variant="duo" size="md">
            Medium
          </Button>
          <Button variant="duo" size="lg">
            Large
          </Button>
          <Button variant="kahoot" size="md" leftIcon={<Zap size={16} />}>
            Kahoot
          </Button>
          <Button variant="outline" size="md">
            Outline
          </Button>
          <Button variant="danger" size="md">
            Danger
          </Button>
          <Button variant="ghost" size="md">
            Ghost
          </Button>
          <Button variant="duo" size="md" isLoading>
            Loading
          </Button>
        </div>
      </Card>

      {/* 2. Form Controls */}
      <Card padding="md" className={styles.demoCard}>
        <div className={styles.demoHeader}>
          <span className={styles.demoTitle}>Switches & Checkboxes</span>
          <Badge variant="blue" size="sm">
            Forms
          </Badge>
        </div>
        <div className={styles.demoCanvas}>
          <Switch
            label="Sound Effects"
            checked={switchVal}
            onChange={setSwitchVal}
          />
          <Switch label="Compact Mode" size="sm" checked={false} />
          <Checkbox
            label="Auto-advance questions"
            checked={checkboxVal}
            onChange={setCheckboxVal}
          />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled option" disabled />
        </div>
      </Card>

      {/* 3. Inputs & Textarea */}
      <Card padding="md" className={styles.demoCard}>
        <div className={styles.demoHeader}>
          <span className={styles.demoTitle}>Text Inputs</span>
          <Badge variant="yellow" size="sm">
            Accessible
          </Badge>
        </div>
        <Stack gap="md">
          <Input
            label="Display Name"
            value={textInputVal}
            onChange={(e) => setTextInputVal(e.target.value)}
            helperText="Visible to other learners on leaderboards"
          />
          <Select
            label="Badge Tier"
            value={selectVal}
            onChange={setSelectVal}
            options={[
              { value: "bronze", label: "Bronze League" },
              { value: "silver", label: "Silver League" },
              { value: "gold", label: "Gold League" },
              { value: "diamond", label: "Diamond League", disabled: true },
            ]}
          />
          <Textarea
            label="Lesson Notes"
            placeholder="Write notes here..."
            showCount
            maxLength={100}
            value="Mastering Japanese hiragana characters"
            readOnly
          />
        </Stack>
      </Card>

      {/* 4. Badges & Avatars */}
      <Card padding="md" className={styles.demoCard}>
        <div className={styles.demoHeader}>
          <span className={styles.demoTitle}>Badges & Avatars</span>
          <Badge variant="purple" size="sm">
            Identity
          </Badge>
        </div>
        <div className={styles.demoCanvas}>
          <Badge variant="duo" icon={<Sparkles size={14} />}>
            Duo
          </Badge>
          <Badge variant="blue">Blue</Badge>
          <Badge variant="red" icon={<Flame size={14} />}>
            Streak
          </Badge>
          <Badge variant="yellow">Gold Tier</Badge>
          <Badge variant="purple">Legendary</Badge>
        </div>
        <Divider />
        <div className={styles.demoCanvas}>
          <Avatar name="Shio" size="sm" ring="duo" />
          <Avatar name="Shio" size="md" ring="blue" showStatus />
          <Avatar name="Shio" size="lg" ring="gold" />
          <Avatar name="Shio" size="xl" ring="kahoot" />
        </div>
      </Card>

      {/* 5. Feedback & Shimmer */}
      <Card padding="md" className={styles.demoCard}>
        <div className={styles.demoHeader}>
          <span className={styles.demoTitle}>Feedback & Shimmers</span>
          <Badge variant="orange" size="sm">
            Async
          </Badge>
        </div>
        <Stack gap="md">
          <ProgressBar value={75} max={100} color="duo" />
          <ProgressBar value={40} max={100} color="yellow" size="sm" />
          <Stack direction="horizontal" gap="sm" align="center">
            <Skeleton variant="circle" width={40} height={40} />
            <Stack gap="xs" className={styles.flex1}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" height="0.8rem" />
            </Stack>
          </Stack>
          <Stack direction="horizontal" gap="sm">
            <Tooltip content="Tooltip above button" placement="top">
              <Button variant="secondary" size="sm">
                Hover Me
              </Button>
            </Tooltip>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Bell size={16} />}
              onClick={() =>
                toast.success(
                  "XP Multiplier Active",
                  "You earned +50 bonus XP!",
                )
              }
            >
              Trigger Toast
            </Button>
          </Stack>
        </Stack>
      </Card>

      {/* 6. Overlays & Accordions */}
      <Card padding="md" className={styles.demoCard}>
        <div className={styles.demoHeader}>
          <span className={styles.demoTitle}>Overlays & Disclosures</span>
          <Badge variant="duo" size="sm">
            Dialogs
          </Badge>
        </div>
        <Stack gap="md">
          <Stack direction="horizontal" gap="sm">
            <Button
              variant="duo"
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              Open Modal
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDrawerVariant("success")}
            >
              Success Drawer
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setDrawerVariant("error")}
            >
              Error Drawer
            </Button>
          </Stack>

          <Accordion
            items={[
              {
                id: "acc-1",
                title: "How do Arena Points calculate?",
                content:
                  "Points reward speed and answer streaks with up to 1000 base points.",
              },
              {
                id: "acc-2",
                title: "What does a Streak Freeze do?",
                content:
                  "Streak Freezes protect your daily login habit if you miss learning one day.",
              },
            ]}
          />
        </Stack>
      </Card>
    </div>
  );

  // Tab 3: Soundboard
  const soundboardContent = (
    <Stack gap="lg">
      <div>
        <h2 className={styles.sectionTitle}>
          Web Audio Synthesizer Soundboard
        </h2>
        <p className={styles.sectionDescription}>
          Zero external audio file overhead. All sound effects are synthesised
          mathematically via the Web Audio API with zero latency.
        </p>

        <div className={styles.soundboardGrid}>
          <Button
            variant="duo"
            size="md"
            leftIcon={<Volume2 size={18} />}
            onClick={playPop}
          >
            Play Pop
          </Button>
          <Button
            variant="secondary"
            size="md"
            leftIcon={<CheckCircle size={18} />}
            onClick={playSuccess}
          >
            Play Success
          </Button>
          <Button
            variant="danger"
            size="md"
            leftIcon={<Volume2 size={18} />}
            onClick={playError}
          >
            Play Error
          </Button>
          <Button
            variant="outline"
            size="md"
            leftIcon={<Zap size={18} />}
            onClick={() => playTick(false)}
          >
            Play Tick
          </Button>
          <Button
            variant="kahoot"
            size="md"
            leftIcon={<Zap size={18} />}
            onClick={() => playTick(true)}
          >
            Play Urgent Tick
          </Button>
          <Button
            variant="duo"
            size="md"
            leftIcon={<Sparkles size={18} />}
            onClick={playFanfare}
          >
            Play Fanfare
          </Button>
        </div>
      </div>

      <Divider label="PARTICLE CONFETTI FIREWORKS" />

      <div>
        <h2 className={styles.sectionTitle}>Celebration Particles</h2>
        <div className={styles.soundboardGrid}>
          <Button variant="duo" size="md" onClick={fireVictoryConfetti}>
            Victory Confetti
          </Button>
          <Button variant="kahoot" size="md" onClick={fireStreakFireworks}>
            Streak Fireworks
          </Button>
          <Button variant="danger" size="md" onClick={fireHeartRefillConfetti}>
            Heart Refill Burst
          </Button>
        </div>
      </div>
    </Stack>
  );

  const TABS = [
    {
      id: "foundations",
      label: "Design Tokens",
      icon: <Sliders size={18} />,
      content: foundationsContent,
    },
    {
      id: "components",
      label: "Component Gallery",
      icon: <Eye size={18} />,
      content: componentsContent,
    },
    {
      id: "soundboard",
      label: "Audio & FX",
      icon: <Volume2 size={18} />,
      content: soundboardContent,
    },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Hero Banner */}
      <Card padding="lg" className={styles.headerCard}>
        <Badge variant="duo" size="sm" icon={<Sparkles size={14} />}>
          KUIZU UI FRAMEWORK • VERSION 2.0
        </Badge>
        <h1 className={styles.title}>Living Design System & Primitives</h1>
        <p className={styles.subtitle}>
          Interactive tactile components engineered for gamified
          micro-interactions, responsive mobile safe areas, and accessible
          keyboard standards.
        </p>

        <div className={styles.badgeRow}>
          <Badge variant="blue">19 UI Primitives</Badge>
          <Badge variant="yellow">100% WCAG 2.1 AA</Badge>
          <Badge variant="duo">React 19 & Turbopack</Badge>
          <Badge variant="purple">137 Automated Tests</Badge>
        </div>
      </Card>

      {/* Main Tabs Explorer */}
      <Tabs tabs={TABS} defaultTab="foundations" />

      {/* Interactive Modal Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Kuizu UI Modal"
      >
        <p className={styles.modalText}>
          This accessible modal traps focus, manages ARIA dialog roles, and can
          be dismissed via backdrop click or Escape.
        </p>
        <Stack
          direction="horizontal"
          justify="end"
          gap="sm"
          className={styles.modalActions}
        >
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="duo" onClick={() => setIsModalOpen(false)}>
            Confirm Action
          </Button>
        </Stack>
      </Modal>

      {/* Interactive Drawer Demo */}
      <Drawer
        status={drawerVariant || "success"}
        isOpen={drawerVariant !== null}
        headline={
          drawerVariant === "success" ? "Brilliant Answer!" : "Needs Review"
        }
        subtext={
          drawerVariant === "success"
            ? "+15 XP awarded for accuracy."
            : 'The correct translation is "Konnichiwa".'
        }
        action={
          <Button
            variant={drawerVariant === "error" ? "danger" : "duo"}
            onClick={() => setDrawerVariant(null)}
          >
            Continue Next
          </Button>
        }
      />
    </div>
  );
}

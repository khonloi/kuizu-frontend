'use client';

import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import styles from './exercise.module.css';
import { useAudioStore } from '@/stores/audio.store';
import type { Exercise } from '@/types/api.types';

interface MatchPairsProps {
  exercise: Exercise;
  onSelect: (answer: string) => void;
  disabled?: boolean;
}

interface PairItem {
  term: string;
  definition: string;
}

export function MatchPairsExercise({
  exercise,
  onSelect,
  disabled = false,
}: MatchPairsProps) {
  const { playPop, playSuccess, playError } = useAudioStore();

  // Parse pairs from options formatted as "Term:Definition"
  const pairs: PairItem[] = useMemo(() => {
    return exercise.options.map((opt) => {
      const [term, definition] = opt.split(':');
      return {
        term: term ? term.trim() : opt,
        definition: definition ? definition.trim() : opt,
      };
    });
  }, [exercise.options]);

  const leftTerms = useMemo(() => pairs.map((p) => p.term), [pairs]);
  const rightDefinitions = useMemo(() => {
    // Reverse or stable shift definitions so they are not side-by-side
    return [...pairs.map((p) => p.definition)].reverse();
  }, [pairs]);

  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matchedTerms, setMatchedTerms] = useState<Set<string>>(() => new Set());
  const [wrongPair, setWrongPair] = useState<{ term: string; definition: string } | null>(null);

  const handleSelectTerm = (term: string) => {
    if (disabled || matchedTerms.has(term)) return;
    playPop();

    if (selectedDefinition) {
      // Check match
      checkMatch(term, selectedDefinition);
    } else {
      setSelectedTerm(term);
    }
  };

  const handleSelectDefinition = (definition: string) => {
    if (disabled) return;
    // Check if definition is already matched
    const isMatched = pairs.some(
      (p) => p.definition === definition && matchedTerms.has(p.term)
    );
    if (isMatched) return;
    playPop();

    if (selectedTerm) {
      // Check match
      checkMatch(selectedTerm, definition);
    } else {
      setSelectedDefinition(definition);
    }
  };

  const checkMatch = (term: string, definition: string) => {
    const isPair = pairs.some(
      (p) => p.term === term && p.definition === definition
    );

    if (isPair) {
      playSuccess();
      const nextMatched = new Set(matchedTerms);
      nextMatched.add(term);
      setMatchedTerms(nextMatched);
      setSelectedTerm(null);
      setSelectedDefinition(null);

      // If all matched, notify runner
      if (nextMatched.size === pairs.length) {
        onSelect(exercise.answer || 'all_matched');
      }
    } else {
      playError();
      setWrongPair({ term, definition });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedTerm(null);
        setSelectedDefinition(null);
      }, 500);
    }
  };

  return (
    <div className={styles.container}>
      {/* Prompt Card */}
      <div className={styles.promptCard}>
        <span className={styles.badgeBlue}>
          TAP THE MATCHING PAIRS
        </span>
        <h2 className={styles.promptText}>{exercise.prompt || 'Match the words with their meanings'}</h2>
      </div>

      {/* Two Column Matching Board */}
      <div className={styles.matchGrid}>
        {/* Left Terms Column */}
        <div className={styles.matchCol}>
          {leftTerms.map((term) => {
            const isMatched = matchedTerms.has(term);
            const isSelected = selectedTerm === term;
            const isWrong = wrongPair?.term === term;

            return (
              <button
                key={term}
                type="button"
                disabled={disabled || isMatched}
                onClick={() => handleSelectTerm(term)}
                className={clsx(styles.matchCard, {
                  [styles.matchCardSelected]: isSelected,
                  [styles.matchCardMatched]: isMatched,
                  [styles.matchCardWrong]: isWrong,
                })}
              >
                {term}
                {isMatched && (
                  <span className={styles.matchedCheckmark} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Check size={16} strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Definitions Column */}
        <div className={styles.matchCol}>
          {rightDefinitions.map((def) => {
            const isMatched = pairs.some(
              (p) => p.definition === def && matchedTerms.has(p.term)
            );
            const isSelected = selectedDefinition === def;
            const isWrong = wrongPair?.definition === def;

            return (
              <button
                key={def}
                type="button"
                disabled={disabled || isMatched}
                onClick={() => handleSelectDefinition(def)}
                className={clsx(styles.matchCard, {
                  [styles.matchCardSelected]: isSelected,
                  [styles.matchCardMatched]: isMatched,
                  [styles.matchCardWrong]: isWrong,
                })}
              >
                {def}
                {isMatched && (
                  <span className={styles.matchedCheckmark} style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Check size={16} strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

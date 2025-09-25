/**
 * HAND LANDMARK UTILITIES
 * Compatible utilities for hand tracking and ring positioning
 */

import * as THREE from 'three';

export enum Finger {
    Thumb = 0,
    Index = 1,
    Middle = 2,
    Ring = 3,
    Pinky = 4
}

export interface HandLandmark {
    x: number;
    y: number;
    z: number;
    visibility?: number;
}

export interface Hand {
    landmarks3D: THREE.Vector3[];
    isRightHand: boolean;
    confidence: number;
    distance: number;

    getRingAttachPositionForFinger(finger: Finger): THREE.Vector3;
    getRingAttachQuaternionForFinger(finger: Finger): THREE.Quaternion;
    getLandmarkMovementFactor(landmarkIndex: number): number;
    getFingerLookAtFactor(finger: Finger): number;
    getCameraLookAtFactor(): number;
}

/**
 * Hand landmark indices for different fingers
 */
export const FINGER_LANDMARKS = {
    [Finger.Thumb]: [1, 2, 3, 4],
    [Finger.Index]: [5, 6, 7, 8],
    [Finger.Middle]: [9, 10, 11, 12],
    [Finger.Ring]: [13, 14, 15, 16],
    [Finger.Pinky]: [17, 18, 19, 20]
};

/**
 * Get finger name as string
 */
export function getFingerName(finger: Finger): string {
    return Finger[finger];
}

/**
 * Calculate ring position for a specific finger
 */
export function calculateRingPosition(landmarks: THREE.Vector3[], finger: Finger): THREE.Vector3 {
    const fingerLandmarks = FINGER_LANDMARKS[finger];
    const baseIndex = fingerLandmarks[0]; // MCP joint
    const tipIndex = fingerLandmarks[3];  // Fingertip

    if (landmarks[baseIndex] && landmarks[tipIndex]) {
        const base = landmarks[baseIndex].clone();
        const tip = landmarks[tipIndex].clone();

        // Position ring at 30% from base to tip for natural look
        return base.lerp(tip, 0.3);
    }

    return new THREE.Vector3();
}

/**
 * Calculate ring rotation for a specific finger
 */
export function calculateRingRotation(landmarks: THREE.Vector3[], finger: Finger): THREE.Quaternion {
    const fingerLandmarks = FINGER_LANDMARKS[finger];
    const mcp = landmarks[fingerLandmarks[0]]; // Base joint
    const pip = landmarks[fingerLandmarks[1]]; // First joint

    if (mcp && pip) {
        const direction = pip.clone().sub(mcp).normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const right = direction.clone().cross(up).normalize();
        const actualUp = right.cross(direction).normalize();

        const matrix = new THREE.Matrix4();
        matrix.makeBasis(right, actualUp, direction.negate());

        return new THREE.Quaternion().setFromRotationMatrix(matrix);
    }

    return new THREE.Quaternion();
}
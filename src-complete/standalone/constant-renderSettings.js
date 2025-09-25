/* Standalone Constant: renderSettings */

const renderSettings = {
			ambientLight: doc.settings().renderSettings().ambientLight,
			backgroundColorTop: doc.settings().renderSettings().backgroundColorTop,
			backgroundColorBottom: doc.settings().renderSettings().backgroundColorBottom,
			useHiddenLights: doc.settings().renderSettings().useHiddenLights,
			depthCue: doc.settings().renderSettings().depthCue,
			flatShade: doc.settings().renderSettings().flatShade,
			renderBackFaces: doc.settings().renderSettings().renderBackFaces,
			renderPoints: doc.settings().renderSettings().renderPoints,
			renderCurves: doc.settings().renderSettings().renderCurves,
			renderIsoParams: doc.settings().renderSettings().renderIsoParams,
			renderMeshEdges: doc.settings().renderSettings().renderMeshEdges,
			renderAnnotations: doc.settings().renderSettings().renderAnnotations,
			useViewportSize: doc.settings().renderSettings().useViewportSize,
			scaleBackgroundToFit: doc.settings().renderSettings().scaleBackgroundToFit,
			transparentBackground: doc.settings().renderSettings().transparentBackground,
			imageDpi: doc.settings().renderSettings().imageDpi,
			shadowMapLevel: doc.settings().renderSettings().shadowMapLevel,
			namedView: doc.settings().renderSettings().namedView,
			snapShot: doc.settings().renderSettings().snapShot,
			specificViewport: doc.settings().renderSettings().specificViewport,
			groundPlane: extractProperties( doc.settings().renderSettings().groundPlane ),
			safeFrame: extractProperties( doc.settings().renderSettings().safeFrame ),
			dithering: extractProperties( doc.settings().renderSettings().dithering ),
			skylight: extractProperties( doc.settings().renderSettings().skylight ),
			linearWorkflow: extractProperties( doc.settings().renderSettings().linearWorkflow ),
			renderChannels: extractProperties( doc.settings().renderSettings().renderChannels ),
			sun: extractProperties( doc.settings().renderSettings().sun ),
			renderEnvironments: extractProperties( doc.settings().renderSettings().renderEnvironments ),
			postEffects: extractProperties( doc.settings().renderSettings().postEffects ),

		};

export default renderSettings;

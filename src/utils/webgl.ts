import * as THREE from 'three';

/**
 * Detects whether the active WebGL context is backed by a software rasterizer
 * (SwiftShader, llvmpipe, ANGLE software, etc.) so pixel ratio, AA, and frame
 * pacing can stay responsive without downgrading scene content.
 */
export function isSoftwareGl(gl: WebGLRenderingContext | WebGL2RenderingContext): boolean {
  try {
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return false;
    const renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '');
    return /SwiftShader|llvmpipe|Software|Basic Render|Mesa OffScreen/i.test(renderer);
  } catch {
    return false;
  }
}

/**
 * Paces frames cleanly on software renderers using WebGL2 fenceSync (or micro-deferral)
 * while running standard requestAnimationFrame on hardware GPUs.
 */
export function scheduleAfterDraw(
  renderer: THREE.WebGLRenderer,
  software: boolean,
  next: () => void,
): number {
  if (!software) {
    return window.requestAnimationFrame(next);
  }

  const gl = renderer.getContext();
  if (typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext) {
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    if (sync) {
      gl.flush();
      const poll = () => {
        const status = gl.clientWaitSync(sync, 0, 0);
        if (status === gl.ALREADY_SIGNALED || status === gl.CONDITION_SATISFIED) {
          gl.deleteSync(sync);
          next();
        } else if (status === gl.WAIT_FAILED) {
          gl.deleteSync(sync);
          next();
        } else {
          window.setTimeout(poll, 16);
        }
      };
      return window.setTimeout(poll, 16);
    }
  }

  return window.setTimeout(next, 32);
}

/**
 * Converts latitude/longitude (degrees) into a 3D point on a sphere of radius R.
 */
export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

# Project memory

## Product intent & audience

- Developer portfolio for Mohammad Hashim (Java Full Stack Developer).
- Showcases projects, background, and skills.
- Audience: recruiters, hiring managers, peers.

## Brand personality & voice

- Developer-focused, technical, modern.

## Visual design & UX direction

- Dark-themed UI.
- 3D animations via Three.js.
- Scroll/transition animations via GSAP and framer-motion.
- React + Vite + Tailwind CSS stack.

## Decisions, constraints & rationale

- framer-motion v14.9.0 is a confirmed dependency (package.json, lockfile, node_modules); installs and resolves correctly.
- Do not remove `MotionConfig` or existing animations; preserve current design and functionality.
- Reinstalling from lockfile (delete node_modules + reinstall) was used to rule out corrupted install; build/lint/typecheck pass.
- Dev server restart must be done manually by user; assistant cannot restart Vite preview.
- If import error persists after reinstall, likely a stale preview cache rather than a real dependency issue.

## Open questions & assumptions

- Root cause of the recurring framer-motion import error is unresolved; may be preview/cache-related rather than a code or dependency problem.
- No other motion/animation libraries are assumed necessary beyond framer-motion, GSAP, and Three.js.
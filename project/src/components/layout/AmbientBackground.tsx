export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(148 163 184 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.12) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)',
        }}
      />
      <div className="float-slow absolute -left-40 top-[10%] h-[32rem] w-[32rem] rounded-full bg-primary-600/20 blur-[120px]" />
      <div
        className="float-slow absolute -right-48 top-[55%] h-[30rem] w-[30rem] rounded-full bg-secondary-600/15 blur-[120px]"
        style={{ animationDelay: '-3s' }}
      />
    </div>
  );
}

// pvz-deconstruction.tsx
export default function PvZDeconstruction() {
  return (
    <iframe
      src="/pvz-deconstruction.html"
      style={{ width: "100vw", height: "100vh", border: 0, display: "block" }}
      title="PvZ Deconstruction"
    />
  );
}

// Tell Next.js to use no layout for this page
PvZDeconstruction.getLayout = (page) => page;

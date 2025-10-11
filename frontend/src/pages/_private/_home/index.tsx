import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_private/_home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grow flex items-center justify-center">
      <h1 className="text-center">Home page</h1>
    </div>
  );
}

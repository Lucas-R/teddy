import Template from '@/template';
import { createRootRoute } from '@tanstack/react-router'

const RootLayout = () => <Template />

export const Route = createRootRoute({ component: RootLayout });
import { AppShell } from '@/components/shell/app-shell'
import { SourceDrawerProvider } from '@/components/kit/source-drawer'
import { IngestFlow } from '@/components/add/ingest-flow'

export default function AddPage() {
  return (
    <SourceDrawerProvider>
      <AppShell crumbs={[{ label: 'Workspace', href: '/' }, { label: 'Add a source' }]}>
        <IngestFlow />
      </AppShell>
    </SourceDrawerProvider>
  )
}

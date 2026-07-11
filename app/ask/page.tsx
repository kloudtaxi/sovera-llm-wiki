import { AppShell } from '@/components/shell/app-shell'
import { SourceDrawerProvider } from '@/components/kit/source-drawer'
import { AskFlow } from '@/components/ask/ask-flow'

export default async function AskPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  return (
    <SourceDrawerProvider>
      <AppShell crumbs={[{ label: 'Workspace', href: '/' }, { label: 'Ask' }]}>
        <AskFlow initialQuestion={q} />
      </AppShell>
    </SourceDrawerProvider>
  )
}

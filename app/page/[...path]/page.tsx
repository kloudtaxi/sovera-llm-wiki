import { AppShell } from '@/components/shell/app-shell'
import { SourceDrawerProvider } from '@/components/kit/source-drawer'
import { SetMode } from '@/components/mode/set-mode'
import { PageContent } from '@/components/page/page-content'
import { PageContextPanel } from '@/components/page/page-context-panel'
import { WIKI_PAGE } from '@/lib/mock-data'

export default async function WikiPageRoute({
  params,
}: {
  params: Promise<{ path: string[] }>
}) {
  await params
  const page = WIKI_PAGE

  return (
    <SourceDrawerProvider>
      <AppShell
        crumbs={[
          { label: 'Workspace', href: '/' },
          { label: 'Acme Corp — Q3 Diligence', href: '/page/projects/acme-q3' },
          { label: page.title },
        ]}
        contextPanel={<PageContextPanel page={page} />}
      >
        <SetMode mode="create" />
        <PageContent page={page} />
      </AppShell>
    </SourceDrawerProvider>
  )
}

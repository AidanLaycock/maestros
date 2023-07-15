import { mdxComponents } from "#/components/mdxComponents";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { allDocuments } from "contentlayer/generated";
import { getPageDocument } from "#/app/(maestros)/contentHandlers";
import { Callout } from "#/components/Callout";

export async function generateStaticParams() {
  return [
    allDocuments.filter(
      (doc) => doc.type === "MaestrosLanding" || doc.type === "MaestrosLesson"
    ),
  ];
}

const Page = ({ params }: { params: { slug: string[] } }) => {
  const content = getPageDocument(params.slug);

  const MDXContent = useMDXComponent(content?.body.code ?? "");
  if (!content) return notFound();
  if (content.unpublished) return notFound();

  return (
    <div className="prose lg:prose-lg dark:prose-invert">
      <Callout type="warning" bold className="mb-10">
        This is an early sneak peek of Monorepo Maestros. Your feedback is
        welcome!
      </Callout>

      <h1>{content.title}</h1>

      <MDXContent components={mdxComponents} />
    </div>
  );
};

export default Page;

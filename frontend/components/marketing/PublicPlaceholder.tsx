import { ChartIcon, UploadIcon, UserIcon } from "@/components/icons/Icons";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Section";
import { publicPlaceholders } from "@/lib/placeholders";

const icons = { demo: ChartIcon, upload: UploadIcon, login: UserIcon, register: UserIcon };

export function PublicPlaceholder({ feature }: { feature: keyof typeof publicPlaceholders }) {
  const { heading, title, body, action, href } = publicPlaceholders[feature];
  return (
    <Container className="py-14">
      <PageHeader title={heading} />
      <EmptyState icon={icons[feature]} title={title} action={<ButtonLink href={href}>{action}</ButtonLink>}>{body}</EmptyState>
    </Container>
  );
}

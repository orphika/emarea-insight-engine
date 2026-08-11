import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Droplets,
  FileText,
  Flame,
  Images,
  ParkingSquare,
  Route as RouteIcon,
  Ruler,
  Truck,
  Warehouse,
  Zap,
} from "lucide-react";

import {
  CtaLink,
  DataRow,
  DemoTag,
  Disclaimer,
  ScoreBar,
  Section,
} from "@/components/emarea/shell";
import { formatSurface, getProperty, properties, type Property } from "@/data/properties";
import { setSelectedProperty, useRequirement } from "@/data/requirement";
import { scoreProperty } from "@/lib/matching";

export const Route = createFileRoute("/biens/$id")({
  loader: ({ params }) => {
    const property = getProperty(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Bien indisponible — EMAREA Digital Intelligence" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.property.title} — fiche de démonstration`;
    const description = `${loaderData.property.commune}, ${loaderData.property.wilaya} — ${formatSurface(
      loaderData.property.surfaceTotale,
    )}. Fiche technique structurée : surfaces, accès, utilités, documents et médias.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property } = Route.useLoaderData() as { property: Property };
  const requirement = useRequirement();
  const { score, criteria } = scoreProperty(property, requirement);

  const others = properties.filter((p) => p.id !== property.id).slice(0, 2);

  return (
    <>
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <p className="label-caps text-primary">
            Étape 02 — Property intelligence · {property.reference}
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            {property.title}
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            {property.commune}, {property.wilaya} · {property.transaction} · {property.status}
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {property.synthese}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setSelectedProperty(property.id)}
              className="inline-flex items-center gap-2 border border-border-strong px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              Sélectionner pour le dossier client
            </button>
            <CtaLink to="/dossier">
              Créer un dossier client
              <ArrowRight className="h-4 w-4" />
            </CtaLink>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
          <div className="bg-surface p-7 lg:col-span-2">
            <h2 className="label-caps text-primary">Informations générales</h2>
            <dl className="mt-5">
              <DataRow label="Référence" value={property.reference} />
              <DataRow label="Classification" value={property.kind} />
              <DataRow label="Transaction" value={property.transaction} />
              <DataRow label="Localisation" value={`${property.commune}, ${property.wilaya}`} />
              <DataRow label="Proximité routière" value={property.autoroute} />
              <DataRow label="Statut commercial" value={property.status} />
            </dl>

            <h2 className="mt-10 label-caps text-primary">Surfaces & bâtiments</h2>
            <dl className="mt-5">
              <DataRow label="Surface totale" value={formatSurface(property.surfaceTotale)} />
              <DataRow label="Surface bâtie" value={formatSurface(property.surfaceBatie)} />
              <DataRow label="Hauteur utile" value={property.hauteurUtile} />
              <DataRow label="Hangars" value={property.hangars} />
              <DataRow label="Administration" value={property.bureaux} />
            </dl>

            <h2 className="mt-10 label-caps text-primary">Accès, utilités & équipements</h2>
            <div className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-2">
              <IconFact icon={Truck} label="Accès grand tonnage" value={property.capabilities.grandTonnage ? "Oui" : "Non"} />
              <IconFact icon={RouteIcon} label="Axe routier" value={property.autoroute} />
              <IconFact icon={Zap} label="Électricité" value={property.electricite} />
              <IconFact icon={Droplets} label="Eau" value={property.eau} />
              <IconFact icon={Flame} label="Gaz" value={property.gaz} />
              <IconFact icon={ParkingSquare} label="Stationnement" value={property.parking} />
              <IconFact icon={Warehouse} label="Hangars" value={property.hangars} />
              <IconFact icon={Building2} label="Bureaux" value={property.bureaux} />
            </div>
            <ul className="mt-6 space-y-2">
              {property.equipements.map((e) => (
                <li key={e} className="flex gap-3 text-sm text-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-primary" aria-hidden="true" />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10 bg-surface p-7">
            <div>
              <h2 className="label-caps text-primary">Compatibilité avec le besoin client</h2>
              <p className="mt-4 font-display text-6xl font-bold text-foreground">{score}%</p>
              <p className="mt-1 text-sm text-muted-foreground">{requirement.client}</p>
              <div className="mt-4">
                <ScoreBar value={score} />
              </div>
              <ul className="mt-5 space-y-2">
                {criteria.map((c) => (
                  <li key={c.label} className="flex items-baseline gap-3 text-sm">
                    <span
                      className={
                        c.status === "ok"
                          ? "text-success"
                          : c.status === "partiel"
                            ? "text-warning"
                            : "text-primary"
                      }
                    >
                      {c.status === "ok" ? "+" : c.status === "partiel" ? "~" : "−"}
                    </span>
                    <span className="flex-1 text-foreground">{c.label}</span>
                    <span className="text-muted-foreground">
                      {c.earned}/{c.weight}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Disclaimer>
                  Score de démonstration basé sur les critères renseignés. Il ne constitue pas une
                  évaluation validée scientifiquement ni un avis technique.
                </Disclaimer>
              </div>
            </div>

            <div>
              <h2 className="label-caps text-primary">Documents</h2>
              <ul className="mt-4 space-y-3">
                {property.documents.map((d) => (
                  <li key={d.label} className="flex items-start gap-3 border-b border-border pb-3">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                    <span className="flex-1 text-sm text-foreground">{d.label}</span>
                    <span
                      className={
                        d.status === "Document fourni"
                          ? "label-caps text-success"
                          : "label-caps text-warning"
                      }
                    >
                      {d.status === "Document fourni" ? "Fourni" : "À vérifier"}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 label-caps text-muted-foreground">
                Document de démonstration — non contractuel
              </p>
            </div>

            <div>
              <h2 className="label-caps text-primary">Médias</h2>
              <p className="mt-4 flex items-center gap-2 text-sm text-foreground">
                <Images className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                {property.mediaPhotos} photos · {property.mediaVideos} vidéo(s)
              </p>
              {property.photos && property.photos.length > 0 ? (
                <>
                  <div className="mt-4 grid grid-cols-3 gap-px bg-border">
                    {property.photos.map((photo) => (
                      <div key={photo.src} className="aspect-4/3 overflow-hidden bg-muted">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {property.photos.length} photographies réelles du bien, fournies par le
                    Cabinet EMAREA. Les {property.mediaPhotos - property.photos.length}{" "}
                    photos restantes du dossier ne sont pas encore numérisées dans ce
                    prototype.
                  </p>
                </>
              ) : (
                <>
                  <div className="mt-4 grid grid-cols-3 gap-px bg-border">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex aspect-4/3 items-center justify-center bg-muted p-2 text-center label-caps text-muted-foreground"
                      >
                        Photo {i + 1}
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Emplacements réservés aux photographies réelles du bien. Aucune image
                    générée n'est utilisée dans la galerie d'un bien.
                  </p>
                </>
              )}
            </div>

            <div>
              <h2 className="label-caps text-primary">Contact</h2>
              <p className="mt-4 text-sm text-foreground">{property.contactName}</p>
              <p className="text-sm text-muted-foreground">{property.contactRole}</p>
            </div>

            <DemoTag>Fiche fictive — données de démonstration</DemoTag>
          </div>
        </div>

        <div className="mt-12">
          <p className="label-caps text-muted-foreground">Autres biens du portefeuille</p>
          <div className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.id}
                to="/biens/$id"
                params={{ id: o.id }}
                className="bg-surface p-6 transition-colors hover:bg-accent"
              >
                <p className="label-caps text-primary">{o.reference}</p>
                <p className="mt-3 font-display text-lg font-bold">{o.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {o.commune}, {o.wilaya} · {formatSurface(o.surfaceTotale)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function IconFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Truck;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-surface p-5">
      <p className="flex items-center gap-2 label-caps text-muted-foreground">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
        {label}
      </p>
      <p className="mt-2 text-sm text-foreground">{value}</p>
    </div>
  );
}

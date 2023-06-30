import { tagline } from "#/app/constants";
import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  const font = await fetch(
    new URL("../../../../../public/fonts/Inter.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const searchParams = new URL(req.url).searchParams;
  const title = searchParams.get("title") ?? "Monorepo Maestros";
  const titleIsMyName = title === "Monorepo Maestros";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            marginBottom: 120,
            display: "flex",
            fontSize: 140,
            fontFamily: "Inter",
            color: "white",
            whiteSpace: "pre-wrap",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img
            src="https://shew.dev/images/me.jpg"
            width={250}
            height={250}
            tw="rounded-full mb-10"
          />
          <div tw="text-8xl text-slate-300">
            {titleIsMyName ? "" : "Monorepo Maestros"}
          </div>
          <div tw="text-6xl text-slate-300 mt-8">{tagline}</div>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Inter",
          data: font,
          style: "normal",
        },
      ],
    }
  );
}

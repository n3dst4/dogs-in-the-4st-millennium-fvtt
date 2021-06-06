/** @jsx jsx */
import { useCallback } from "react";
import { DIM41Actor } from "../../module/DIM41Actor";
import { jsx } from "@emotion/react";
import { CSSReset } from "../../common/components/CSSReset";
import { themes } from "../../theme";

type DIM41ActorSheetProps = {
  actor: DIM41Actor,
  foundryApplication: ActorSheet,
}

export const DIM41ActorSheet = ({
  actor,
  foundryApplication,
}: DIM41ActorSheetProps) => {
  const onImageClick = useCallback(() => {
    console.log("onImageClick");
    const fp = new FilePicker({
      type: "image",
      current: actor.data.img,
      callback: (path: string) => {
        actor.update({
          img: path,
        });
      },
      top: (foundryApplication.position.top ?? 0) + 40,
      left: (foundryApplication.position.left ?? 0) + 10,
    });
    // types aren't quite right for fp
    return (fp as any).browse();
  }, [actor, foundryApplication.position.left, foundryApplication.position.top]);

  const theme = themes.dim41Theme;

  return (
      <CSSReset
        theme={theme}
        css={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "grid",
          gridTemplateRows: "min-content max-content 1fr",
          gridTemplateColumns: "10em 1fr 10em",
          gap: "0.5em",
          gridTemplateAreas:
            "\"title title image\" " +
            "\"pools stats image\" " +
            "\"pools body  body\" ",
        }}
      >
        <div
          css={{
            gridArea: "title",
            textAlign: "center",
            position: "relative",
          }}
        >
        </div>
        <div
          css={{
            gridArea: "image",
            backgroundImage: `url("${actor.data.img}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "0.2em",
            boxShadow: "0em 0em 0.5em 0.1em rgba(0,0,0,0.5)",
            transform: "rotateZ(2deg)",
          }}
          onClick={onImageClick}
        />
      </CSSReset>
  );
};

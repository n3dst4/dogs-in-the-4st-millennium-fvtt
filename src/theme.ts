import { css, SerializedStyles } from "@emotion/react";
import Irid from "irid";
import React from "react";
import { systemName } from "./constants";

export type ThemeSeed = {
  displayName: string,
  bodyFont: string,
  wallpaperUrl: string,
  global?: SerializedStyles,
  displayFont: string,
  colors: {
    accent: string,
    accentContrast: string,
    glow: string,
    wallpaper: string,

    bgTransSecondary: string,
    bgTransPrimary: string,

    bgOpaqueDangerPrimary?: string,
    bgOpaqueDangerSecondary?: string,
    bgTransDangerPrimary?: string,
    bgTransDangerSecondary?: string,

    bgTint: string,

    text: string,
    textMuted: string,
  },
}

export type Theme = ThemeSeed & {
  colors: ThemeSeed["colors"] & {
    bgOpaquePrimary: string,
    bgOpaqueSecondary: string,
    bgOpaqueDangerPrimary: string,
    bgOpaqueDangerSecondary: string,
    bgTransDangerPrimary: string,
    bgTransDangerSecondary: string,
  },
}

/**
 * Given two colors, create a third which is the result of overlaying the second
 * on the first
 */
const overlay = (baseString: string, layerString: string): string => {
  const layer = Irid(layerString);
  const opacity = layer.opacity();
  const layerOpaque = layer.opacity(1);
  const result = Irid(baseString).blend(layerOpaque, opacity);
  return result.toRGBString();
};

/**
 * Turn a ThemeSeed (bare basics for defining a theme) into a fully usable
 * theme
 */
export const themeFactory = (seed: ThemeSeed): Theme => {
  const bgOpaquePrimary = overlay(seed.colors.wallpaper, seed.colors.bgTransPrimary);
  const bgOpaqueSecondary = overlay(seed.colors.wallpaper, seed.colors.bgTransSecondary);

  const red = Irid("red");
  const bgTransPrimary = Irid(seed.colors.bgTransPrimary);
  const bgTransSecondary = Irid(seed.colors.bgTransSecondary);

  const bgTransDangerPrimary = seed.colors.bgTransDangerPrimary || bgTransPrimary.blend(red, 0.3).opacity(bgTransPrimary.opacity()).toRGBString();
  const bgTransDangerSecondary = seed.colors.bgTransDangerSecondary || bgTransSecondary.blend(red, 0.3).opacity(bgTransSecondary.opacity()).toRGBString();
  const bgOpaqueDangerPrimary = seed.colors.bgOpaqueDangerPrimary || overlay(seed.colors.wallpaper, bgTransDangerPrimary);
  const bgOpaqueDangerSecondary = seed.colors.bgOpaqueDangerSecondary || overlay(seed.colors.wallpaper, bgTransDangerSecondary);

  return {
    ...seed,
    colors: {
      ...seed.colors,
      bgOpaquePrimary,
      bgOpaqueSecondary,
      bgTransDangerPrimary,
      bgTransDangerSecondary,
      bgOpaqueDangerPrimary,
      bgOpaqueDangerSecondary,
    },
  };
};

export const dim41Theme: Theme = themeFactory({
  displayName: "Dim Sum",
  global: css`
    @import url("https://fonts.googleapis.com/css2?family=Federo&display=swap");
    @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand+SC&display=swap');
  `,
  wallpaperUrl: `url(systems/${systemName}/assets/wallpaper/marjanblan-5Ft4NWTmeJE-unsplash.webp)`,
  bodyFont: "16px 'Patrick Hand SC', sans-serif",
  displayFont: "normal small-caps normal 1em 'Federo', serif",
  colors: {
    accent: "#1d5d5d",
    accentContrast: "white",
    glow: "#5effff",
    wallpaper: "#ddd",
    bgTransSecondary: "rgba(255,255,255,0.2)",
    bgTransPrimary: "rgba(255,255,255,0.5)",
    bgTint: "rgba(0,0,0,0.1)",
    text: "#433",
    textMuted: "#744",
  },
});

export const themes: {[themeName: string]: Theme} = {
  dim41Theme,
};

export const ThemeContext = React.createContext<Theme>(dim41Theme);

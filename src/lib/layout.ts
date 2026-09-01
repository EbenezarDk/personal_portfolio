export const SITE_MAX_WIDTH = 1920;

export const SITE_GUTTER_CLASSES = "px-6 sm:px-10 lg:px-[100px]";

/** Matches header/footer: centered 1920px content column on ultra-wide screens. */
export const SITE_MAX_WIDTH_CLASSES =
  "min-[1921px]:mx-auto min-[1921px]:max-w-[1920px]";

export const SITE_CONTAINER_CLASSES = `w-full ${SITE_GUTTER_CLASSES} ${SITE_MAX_WIDTH_CLASSES}`;

/** Horizontal inset for absolutely positioned elements (padding does not inset absolute children). */
export const SITE_GUTTER_INSET_CLASSES =
  "left-6 right-6 sm:left-10 sm:right-10 lg:left-[100px] lg:right-[100px]";

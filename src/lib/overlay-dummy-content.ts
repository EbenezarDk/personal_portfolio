export type OverlayDummyMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
};

export const overlayDummyInlineImage =
  "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600";

const pexelsMedia: Record<string, OverlayDummyMedia> = {
  agilus: {
    type: "video",
    src: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
    alt: "Placeholder laboratory video",
  },
  "royal-sundaram": {
    type: "image",
    src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Placeholder office collaboration photo",
  },
  "crypto-io-design-system": {
    type: "video",
    src: "https://videos.pexels.com/video-files/3209298/3209298-uhd_2560_1440_25fps.mp4",
    alt: "Placeholder technology video",
  },
  banglalink: {
    type: "image",
    src: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Placeholder laboratory photo",
  },
  flytbase: {
    type: "video",
    src: "https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_30fps.mp4",
    alt: "Placeholder aerial video",
  },
};

const fallbackMedia: OverlayDummyMedia = {
  type: "image",
  src: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1600",
  alt: "Placeholder project media",
};

export function getOverlayDummyMedia(projectId: string): OverlayDummyMedia {
  return pexelsMedia[projectId] ?? fallbackMedia;
}

export const overlayDummyOverviewParagraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
];

export const overlayDummyMidScrollParagraphs = [
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
];

export const overlayDummyDetailsParagraphs = [
  "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.",
];

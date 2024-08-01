<<<<<<< HEAD
import { Metadata } from "next";

=======
>>>>>>> aa4e6fe1ae75534362c2a07ada6c534369f4b464
export const socials = [
  {
    id: 1,
    name: "Portfolio",
    url: "https://laurencelama.com/",
    handle: "LaurenceLama",
  },
  {
    id: 2,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/laurencelama/",
    handle: "LaurenceLama",
  },
<<<<<<< HEAD
];

const title = "Newsletter app";
const description =
  "Newsletter app created by me, Laurence Lama.";
const image =
  `https://drive.google.com/file/d/1gdSmkXhLv3TPnB9sQktdDQGqtMLv0d3I/view?usp=sharing`;

export const metaData: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    url: "https://laurencelama.com",
    siteName: "Laurence Lama",
    images: [{ url: image }],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // twitter: {
  //   title: title,
  //   description: description,
  //   card: "summary_large_image",
  //   images: [image],
  //   creator: "",
  // },
};
=======
];
>>>>>>> aa4e6fe1ae75534362c2a07ada6c534369f4b464

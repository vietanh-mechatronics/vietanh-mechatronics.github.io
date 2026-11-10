# Viet Anh Nguyen — academic portfolio

English-language academic website for GitHub Pages, based on `scholarship_cv.tex`. No dependencies or build step. Experience keeps the CV's order: Ecotel → AiRA Laboratory → Magicwave.

## Edit

- `index.html`: personal information, biography, education, experience, research, publications, awards, skills, contact.
- `style.css`: responsive layout and typography.
- `media.js`: profile photo, project images, and videos.
- `script.js`: renders configured media. Text and prepared media slots also work without JavaScript.

The accepted MEAFD paper and ICRA submission retain the distinct titles/statuses in the current CV. No paper URL or complete coauthor list has been invented.

## Add images and videos

Put files in `media/`, then edit `media.js`. Set your profile photo:

```js
portrait: { src: "media/portrait.jpg", alt: "Portrait of Viet Anh Nguyen" },
```

Populate a project's array with images and local videos:

```js
simreal: [
  { type: "image", src: "media/so101-setup.jpg", alt: "SO101 manipulator and cameras in the lab", caption: "Real-world experimental setup." },
  { type: "video", src: "media/so101-rollout.mp4", poster: "media/so101-poster.jpg", caption: "ACT pick-and-place rollout." }
],
```

`poster` and `caption` are optional. All images need descriptive `alt` text. You can also embed YouTube:

```js
magicwave: [
  { type: "youtube", src: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", caption: "Language-conditioned interaction on the Unitree R1." }
],
```

Replace `YOUR_VIDEO_ID` with the real 11-character ID. Groups: `ecotel`, `simreal`, `recovery`, `magicwave`, `publication`. Add any number of items; the grid wraps automatically. Empty arrays show the prepared slots; `publication` stays hidden until populated. To hide unused slots, remove the corresponding `data-media` div from `index.html`.

Use compressed H.264 MP4 videos for broad compatibility, or YouTube for longer videos. Playback is visitor-controlled. Commit media files together with `media.js`.

## Preview and publish

From this directory:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. For GitHub Pages, put this directory's contents at the root of `vietanh-mechatronics/vietanh-mechatronics.github.io` and publish the intended branch from `/ (root)` in Settings → Pages.

Keep `.nojekyll`, `index.html`, `style.css`, `media.js`, `script.js`, and `media/` together. Do not upload unrelated workspace directories. Assets use relative paths and work under repository subpaths.

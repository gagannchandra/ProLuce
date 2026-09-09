# ProLuce Catalogues

The master catalogue PDF (`Pro-Luce-Catalogue.pdf`) is distributed separately due to GitHub's file size limit (files >100MB cannot be pushed to git).

### Local Development
To serve the master catalogue locally via the web app, place or symlink the PDF here:

```bash
# Example symlink from downloads:
ln -s "/path/to/Pro-Luce-Catalogue.pdf" public/pdf/Pro-Luce-Catalogue.pdf
```

### Production Deployment
In production, host the master catalogue PDF on a CDN or cloud object storage (such as AWS S3, Cloudflare R2, or Vercel Blob) and update `catalogPdfUrl` in `src/lib/site.ts`.

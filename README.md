# CMU MoonMiners Website

A modern, accessible team website for CMU MoonMiners (NASA Lunabotics) built with Next.js 14+, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Three Public Pages**: Home, Team, and Sponsors
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Automatic theme switching with next-themes
- **Content Management**: Easy editing via JSON/YAML files
- **SEO Optimized**: Metadata, Open Graph, and social previews
- **Accessibility**: WCAG AA compliant with semantic HTML
- **Performance**: Optimized images and static generation
- **Testing**: Playwright end-to-end tests
- **CI/CD**: GitHub Actions workflow

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theme**: next-themes
- **Content**: JSON/YAML with Zod validation
- **Testing**: Playwright
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lunabotics-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── content/                 # Content files (JSON/YAML)
│   ├── site.json           # Site configuration
│   ├── members.json         # Team members data
│   ├── team.json           # Team information
│   └── sponsors.json        # Sponsors data
├── public/images/          # Static images
│   ├── hero/              # Hero images
│   ├── members/           # Member photos
│   ├── team/              # Team photos
│   └── sponsors/          # Sponsor logos
├── src/
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   └── lib/              # Utilities and content loading
└── tests/                # Playwright tests
```

## 📝 Content Management

### Adding Team Members

1. Edit `/content/members.json`
2. Add new member object:
```json
{
  "name": "John Doe",
  "role": "Software Engineer",
  "subteam": "Software",
  "email": "johndoe@andrew.cmu.edu",
  "photo": "/images/members/john-doe.jpg",
  "links": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "website": ""
  },
  "bio": "Software engineer focused on autonomous systems.",
  "tags": ["Software", "Autonomy", "ROS2"]
}
```
3. Add member photo to `/public/images/members/`
4. Commit and push changes

### Adding Sponsors

1. Edit `/content/sponsors.json`
2. Add sponsor to appropriate tier:
```json
{
  "name": "Company Name",
  "logo": "/images/sponsors/company-logo.svg",
  "url": "https://company.com",
  "blurb": "Supporting lunar robotics research.",
  "whiteOnDark": false
}
```
3. Add sponsor logo to `/public/images/sponsors/`
4. Commit and push changes

### Updating Site Information

Edit `/content/site.json` to update:
- Team name and tagline
- Contact information
- Social media links
- Hero section content

## 🖼 Image Guidelines

### Member Photos
- **Aspect Ratio**: 4:5 (portrait)
- **Size**: 400x500px recommended
- **Format**: JPG or PNG
- **Naming**: `firstname-lastname.jpg`

### Team Photos
- **Aspect Ratio**: 3:1 (landscape)
- **Size**: 1200x400px recommended
- **Format**: JPG
- **Naming**: `team-YYYY.jpg`

### Sponsor Logos
- **Format**: SVG preferred, PNG acceptable
- **Size**: 200x80px recommended
- **Background**: Transparent or white
- **Naming**: `company-name.svg`

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in headed mode
npm run test:headed
```

### Test Coverage
- Homepage loads correctly
- Team page with member grid
- Sponsors page with tiers
- Navigation functionality
- Theme toggle
- Responsive design

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## 🎨 Customization

### Colors
The site uses CMU-inspired colors defined in `src/app/globals.css`:
- **Primary**: CMU Red (#990000)
- **Accent**: Gold (#FFB81C)
- **Neutrals**: Tailwind slate/stone scales

### Typography
- **Sans**: Inter (UI text)
- **Serif**: Newsreader (headlines)

### Components
All components are in `/src/components/` and use shadcn/ui as the base.

## 📊 Performance

The site is optimized for performance:
- Static generation for all pages
- Optimized images with next/image
- Minimal JavaScript bundle
- Lighthouse score: 90+ across all metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, contact:
- Email: moonminers@andrew.cmu.edu
- GitHub: [CMU MoonMiners](https://github.com/cmu-moonminers)

---

Built with ❤️ by CMU MoonMiners

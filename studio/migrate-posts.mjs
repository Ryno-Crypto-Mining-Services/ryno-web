import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'mo8rs3o1',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// Helper to convert markdown to Sanity block content
function markdownToBlocks(markdown) {
  const blocks = []
  const lines = markdown.trim().split('\n')
  
  let currentBlock = null
  
  for (const line of lines) {
    if (!line.trim()) {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      continue
    }
    
    // Headings
    if (line.startsWith('# ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).substr(2, 9),
        style: 'h1',
        children: [{_type: 'span', text: line.substring(2), marks: []}],
      })
      currentBlock = null
    } else if (line.startsWith('## ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).substr(2, 9),
        style: 'h2',
        children: [{_type: 'span', text: line.substring(3), marks: []}],
      })
      currentBlock = null
    } else if (line.startsWith('### ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).substr(2, 9),
        style: 'h3',
        children: [{_type: 'span', text: line.substring(4), marks: []}],
      })
      currentBlock = null
    } else if (line.startsWith('- ')) {
      // List items
      if (!currentBlock || currentBlock.listItem !== 'bullet') {
        if (currentBlock) blocks.push(currentBlock)
        currentBlock = {
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          style: 'normal',
          listItem: 'bullet',
          children: [{_type: 'span', text: line.substring(2), marks: []}],
        }
      } else {
        blocks.push(currentBlock)
        currentBlock = {
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          style: 'normal',
          listItem: 'bullet',
          children: [{_type: 'span', text: line.substring(2), marks: []}],
        }
      }
    } else {
      // Normal paragraph
      if (currentBlock && currentBlock.style === 'normal' && !currentBlock.listItem) {
        currentBlock.children[0].text += ' ' + line
      } else {
        if (currentBlock) blocks.push(currentBlock)
        // Handle bold text **text**
        const text = line.replace(/\*\*([^*]+)\*\*/g, '$1')
        currentBlock = {
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          style: 'normal',
          children: [{_type: 'span', text, marks: line.includes('**') ? ['strong'] : []}],
        }
      }
    }
  }
  
  if (currentBlock) blocks.push(currentBlock)
  
  return blocks
}

// Blog posts data
const blogPosts = [
  {
    title: "Introducing TerraHash Stack: The Future of Bitcoin Mining Infrastructure",
    slug: "introducing-terrahash-stack",
    excerpt: "Discover how TerraHash Stack is revolutionizing bitcoin mining with open-source technology, AI-powered optimization, and direct-to-chip cooling for unprecedented efficiency.",
    content: `# The Future of Bitcoin Mining is Here

TerraHash Stack represents a paradigm shift in bitcoin mining infrastructure. By combining open-source hardware, AI-powered software agents, and cutting-edge cooling technology, we've created a platform that delivers unprecedented efficiency and profitability.

## Key Innovations

### Open-Source Foundation
Our commitment to open-source stewardship means transparency, community collaboration, and continuous improvement. Every component of TerraHash Stack is built on open standards, ensuring interoperability and avoiding vendor lock-in.

### AI-Powered Optimization
Autonomous AI agents continuously monitor and optimize every aspect of your mining operation:
- Real-time performance tuning
- Predictive maintenance alerts
- Dynamic power management
- Automated failover and recovery

### Direct-to-Chip Cooling
Partnering with Chilldyne, we've integrated direct-to-chip liquid cooling that delivers:
- 40% energy savings compared to air cooling
- 700% greater cooling efficiency
- 100% leak-proof operation with patented negative pressure technology
- Extended equipment lifespan by 40%

## Results That Matter

Early adopters of TerraHash Stack are seeing remarkable improvements:
- **65% reduction** in operational costs
- **69% improvement** in uptime
- **30% increase** in hash rate efficiency
- **95% cooling efficiency** vs traditional systems

## Getting Started

Whether you're building a new facility or retrofitting an existing operation, TerraHash Stack provides the tools and technology you need to compete in today's mining landscape.

Ready to evolve your mining operation? Contact us to schedule a consultation.`,
    category: "TerraHash Updates",
    date: "2024-11-01",
    tags: ["TerraHash Stack", "Innovation", "Mining Technology"],
    featured: true,
  },
  {
    title: "40% Equipment Lifespan Extension: How Direct-to-Chip Cooling Changes Everything",
    slug: "direct-to-chip-cooling",
    excerpt: "Learn how Chilldyne's patented negative pressure cooling technology extends ASIC lifespan by 40% while reducing energy consumption and operational costs.",
    content: `# The Cooling Revolution

Heat is the enemy of mining hardware. Traditional air cooling systems struggle to keep ASICs at optimal temperatures, leading to thermal throttling, reduced performance, and premature hardware failure. Chilldyne's direct-to-chip liquid cooling changes everything.

## The Problem with Air Cooling

Air cooling has fundamental limitations:
- Inefficient heat transfer
- High energy consumption for HVAC
- Inconsistent cooling across racks
- Noise pollution
- Large physical footprint

## Direct-to-Chip Liquid Cooling

Chilldyne's patented negative pressure technology delivers liquid cooling directly to ASIC chips.

### 40% Energy Savings
By eliminating the need for massive HVAC systems and fans, liquid cooling reduces energy consumption by 40% compared to air-cooled facilities.

### 700% Greater Efficiency
Liquid cooling is 700% more efficient at heat transfer than air, keeping ASICs at optimal temperatures even under maximum load.

### 100% Leak-Proof
The negative pressure system ensures that any breach in the cooling loop pulls air in rather than pushing coolant out, making it completely leak-proof.

### Extended Equipment Lifespan
By maintaining optimal operating temperatures, direct-to-chip cooling extends ASIC lifespan by 40%, dramatically improving ROI.

## Real-World Impact

Mining operators using Chilldyne cooling report significant improvements in uptime, efficiency, and profitability. The technology is proven in production environments worldwide.`,
    category: "Technology",
    date: "2024-10-28",
    tags: ["Cooling", "Hardware", "Efficiency"],
    featured: true,
  },
  {
    title: "Retrofitting Your Mining Facility: A Complete Guide",
    slug: "retrofitting-guide",
    excerpt: "Thinking about upgrading your existing mining operation? This comprehensive guide covers everything you need to know about retrofitting with TerraHash Stack.",
    content: `# Retrofitting Your Mining Facility

Upgrading an existing mining facility with TerraHash Stack technology can dramatically improve efficiency and profitability without the cost and time of building new infrastructure.

## Assessment Phase

Before retrofitting, conduct a thorough assessment of your current operation:
- Power infrastructure capacity
- Cooling system limitations
- Network connectivity
- Physical space constraints
- Current hardware inventory

## Planning Your Retrofit

Develop a phased approach that minimizes downtime while maximizing improvements. Consider upgrading in stages to maintain revenue during the transition.

## Implementation

Work with experienced partners who understand both legacy systems and modern infrastructure. Proper planning and execution are critical to success.

## Expected Results

Retrofitted facilities typically see 40-60% improvements in operational efficiency, with payback periods of 12-18 months depending on scale and scope.`,
    category: "Mining Industry",
    date: "2024-10-25",
    tags: ["Retrofitting", "Operations", "ROI"],
    featured: false,
  },
  {
    title: "ServerDomes: Biomimetic Architecture for Next-Gen Data Centers",
    slug: "serverdomes-architecture",
    excerpt: "Explore how ServerDomes' revolutionary dome architecture delivers 40% lower operating costs and 8-12 month build times for mining facilities.",
    content: `# Biomimetic Data Center Design

ServerDomes applies principles from nature to create the most efficient data center architecture available today.

## The Dome Advantage

Dome structures provide inherent strength, optimal airflow, and minimal surface area for superior thermal management.

## Rapid Deployment

Prefabricated components and streamlined construction processes enable 8-12 month build times compared to 18-24 months for traditional facilities.

## Cost Efficiency

40% lower operating costs through superior thermal design, reduced materials, and optimized space utilization.

## Sustainability

Natural ventilation, passive cooling, and renewable energy integration make ServerDomes the sustainable choice for modern mining operations.`,
    category: "Technology",
    date: "2024-10-20",
    tags: ["Infrastructure", "Data Centers", "Sustainability"],
    featured: false,
  },
  {
    title: "Ryno Crypto Services Joins Forces with Leading Infrastructure Partners",
    slug: "strategic-partnerships",
    excerpt: "Announcing strategic partnerships with ServerDomes and Chilldyne to deliver unparalleled mining infrastructure solutions.",
    content: `# Strategic Partnerships Announced

Ryno Crypto Services is proud to announce strategic partnerships with ServerDomes and Chilldyne, two industry leaders in mining infrastructure.

## ServerDomes Partnership

Together, we're bringing revolutionary dome architecture to bitcoin mining, delivering faster build times and lower operating costs.

## Chilldyne Integration

Direct-to-chip liquid cooling integration provides our clients with the most efficient thermal management available.

## Combined Advantage

These partnerships enable Ryno to deliver turnkey mining solutions that outperform traditional infrastructure in every metric.`,
    category: "Company News",
    date: "2024-10-15",
    tags: ["Partnerships", "Infrastructure", "Innovation"],
    featured: false,
  },
  {
    title: "Open Source Mining: Why Transparency Matters",
    slug: "open-source-mining",
    excerpt: "Exploring the importance of open-source technology in bitcoin mining and how it strengthens the entire ecosystem.",
    content: `# The Power of Open Source

Bitcoin itself is open source, and mining infrastructure should follow the same principles of transparency and community collaboration.

## Community Innovation

Open-source projects benefit from contributions by developers worldwide, accelerating innovation and improving security through peer review.

## Avoiding Vendor Lock-In

Proprietary systems create dependencies that limit flexibility and increase costs. Open standards ensure portability and choice.

## Strengthening Bitcoin

When mining technology is open and auditable, it strengthens Bitcoin's decentralization and security model.

## Our Commitment

Ryno Crypto Services actively contributes to open-source mining projects and builds on open standards wherever possible.`,
    category: "Mining Industry",
    date: "2024-10-10",
    tags: ["Open Source", "Community", "Bitcoin"],
    featured: false,
  },
]

async function migrate() {
  console.log('Starting migration...')
  
  // Create author
  console.log('Creating author...')
  const author = await client.create({
    _type: 'author',
    name: 'Elvis Nuno',
    slug: {_type: 'slug', current: 'elvis-nuno'},
    linkedin: 'https://www.linkedin.com/in/elvis-nuno-5635914/',
  })
  console.log('Author created:', author._id)
  
  // Create categories
  console.log('Creating categories...')
  const categories = {}
  const categoryNames = ['TerraHash Updates', 'Technology', 'Mining Industry', 'Company News']
  
  for (const name of categoryNames) {
    const category = await client.create({
      _type: 'category',
      title: name,
      slug: {_type: 'slug', current: name.toLowerCase().replace(/\s+/g, '-')},
    })
    categories[name] = category._id
    console.log(`Category created: ${name}`)
  }
  
  // Create posts
  console.log('Creating blog posts...')
  for (const post of blogPosts) {
    const sanityPost = {
      _type: 'post',
      title: post.title,
      slug: {_type: 'slug', current: post.slug},
      author: {_type: 'reference', _ref: author._id},
      category: {_type: 'reference', _ref: categories[post.category]},
      tags: post.tags,
      publishedAt: new Date(post.date).toISOString(),
      excerpt: post.excerpt,
      body: markdownToBlocks(post.content),
      featured: post.featured,
    }
    
    const created = await client.create(sanityPost)
    console.log(`Post created: ${post.title}`)
  }
  
  console.log('Migration complete!')
}

migrate().catch(console.error)

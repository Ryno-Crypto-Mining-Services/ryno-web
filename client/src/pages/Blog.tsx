import { useState } from "react";
import { Calendar, Tag, ArrowRight, Search } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Blog post type definition
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
  featured: boolean;
  tags: string[];
}

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Introducing TerraHash Stack: The Future of Bitcoin Mining Infrastructure",
    excerpt: "Discover how TerraHash Stack is revolutionizing bitcoin mining with open-source technology, AI-powered optimization, and direct-to-chip cooling for unprecedented efficiency.",
    content: "",
    category: "TerraHash Updates",
    date: "2024-11-01",
    author: "Elvis Nuno",
    image: "/terrahash-logo.png",
    featured: true,
    tags: ["TerraHash Stack", "Innovation", "Mining Technology"],
  },
  {
    id: "2",
    title: "40% Equipment Lifespan Extension: How Direct-to-Chip Cooling Changes Everything",
    excerpt: "Learn how Chilldyne's patented negative pressure cooling technology extends ASIC lifespan by 40% while reducing energy consumption and operational costs.",
    content: "",
    category: "Technology",
    date: "2024-10-28",
    author: "Elvis Nuno",
    image: "/chilldyne-logo.png",
    featured: true,
    tags: ["Cooling", "Hardware", "Efficiency"],
  },
  {
    id: "3",
    title: "Retrofitting Your Mining Facility: A Complete Guide",
    excerpt: "Thinking about upgrading your existing mining operation? This comprehensive guide covers everything you need to know about retrofitting with TerraHash Stack.",
    content: "",
    category: "Mining Industry",
    date: "2024-10-25",
    author: "Elvis Nuno",
    image: "/ryno-logo.png",
    featured: false,
    tags: ["Retrofitting", "Operations", "ROI"],
  },
  {
    id: "4",
    title: "ServerDomes: Biomimetic Architecture for Next-Gen Data Centers",
    excerpt: "Explore how ServerDomes' revolutionary dome architecture delivers 40% lower operating costs and 8-12 month build times for mining facilities.",
    content: "",
    category: "Technology",
    date: "2024-10-20",
    author: "Elvis Nuno",
    image: "/serverdomes-logo.png",
    featured: false,
    tags: ["Infrastructure", "Data Centers", "Sustainability"],
  },
  {
    id: "5",
    title: "Ryno Crypto Services Joins Forces with Leading Infrastructure Partners",
    excerpt: "Announcing strategic partnerships with ServerDomes and Chilldyne to deliver unparalleled mining infrastructure solutions.",
    content: "",
    category: "Company News",
    date: "2024-10-15",
    author: "Elvis Nuno",
    image: "/ryno-logo.png",
    featured: false,
    tags: ["Partnerships", "Company News", "Growth"],
  },
  {
    id: "6",
    title: "Zero-Trust Security in Bitcoin Mining: Why It Matters",
    excerpt: "Understanding the importance of zero-trust network architecture in protecting your mining operations from cyber threats.",
    content: "",
    category: "Technology",
    date: "2024-10-10",
    author: "Elvis Nuno",
    image: "/terrahash-logo.png",
    featured: false,
    tags: ["Security", "Network", "Best Practices"],
  },
];

const categories = ["All", "Company News", "Technology", "Mining Industry", "TerraHash Updates"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts by category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Blog & News
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Stay updated with the latest insights on bitcoin mining, TerraHash Stack technology, 
              and industry developments from the Ryno Crypto Services team.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border hover:border-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <article className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer h-full">
                    <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-48 h-48 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-foreground/60 mb-3">
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-foreground/70 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground/60">By {post.author}</span>
                        <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Articles */}
      {regularPosts.length > 0 && (
        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <article className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer h-full flex flex-col">
                    <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-sm text-foreground/60 mb-3">
                        <span className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-foreground/70 mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-foreground/60">By {post.author}</span>
                        <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-6xl text-center py-16">
            <h3 className="text-2xl font-bold mb-4">No articles found</h3>
            <p className="text-foreground/70 mb-8">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
              Clear Filters
            </Button>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-foreground/70 mb-8">
            Subscribe to our newsletter for the latest updates on TerraHash Stack, 
            mining industry insights, and company news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Lightbulb,
  Briefcase,
  Share2,
  BarChart,
  BrainCircuit,
  GraduationCap,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="font-headline">CollegeFounder</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
            Where Campus Ideas Become Startups
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            CollegeFounder is the exclusive network for student entrepreneurs to
            connect, collaborate, and access the resources needed to build the
            future.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Join the Hub</Link>
          </Button>
        </section>

        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">
              Everything You Need to Launch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Find Co-founders"
                description="Connect with students from your college or across the country who have the skills you need."
              />
              <FeatureCard
                icon={<Lightbulb className="h-8 w-8 text-primary" />}
                title="Share & Validate Ideas"
                description="Post your startup ideas, get feedback, and find your first believers in a supportive community."
              />
              <FeatureCard
                icon={<Briefcase className="h-8 w-8 text-primary" />}
                title="Exchange Tasks"
                description="Offer your skills for rewards or find collaborators for tasks like coding, design, and marketing."
              />
              <FeatureCard
                icon={<Share2 className="h-8 w-8 text-primary" />}
                title="Share Resources"
                description="Access a library of pitch decks, templates, and tools shared by other student founders."
              />
              <FeatureCard
                icon={<BarChart className="h-8 w-8 text-primary" />}
                title="Track Your Progress"
                description="A personalized dashboard to visualize your contributions, collaborations, and growth."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Smart Connections"
                description="Get intelligent recommendations for potential collaborators, mentors, and partners."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CollegeFounder. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="text-center bg-background">
      <CardHeader>
        <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
          {icon}
        </div>
        <CardTitle className="font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

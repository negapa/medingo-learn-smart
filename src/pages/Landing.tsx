import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Stethoscope, Brain, Heart } from 'lucide-react';
import heroImage from '@/assets/hero-medical.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">Medingo</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/signin">
              <Button variant="outline" size="default">
                Sign In
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Learn Medicine the{' '}
                <span className="text-transparent bg-gradient-primary bg-clip-text">
                  Smart Way
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Master medical concepts through interactive lessons, just like learning a new language. 
                Gamified education designed specifically for medical students.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button size="xl" className="group">
                  Start Learning Free
                  <Brain className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" size="xl">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Interactive Learning</h3>
                <p className="text-sm text-muted-foreground">Engaging medical scenarios</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Gamified Progress</h3>
                <p className="text-sm text-muted-foreground">XP, streaks, and achievements</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Medical Focus</h3>
                <p className="text-sm text-muted-foreground">Content by medical experts</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Medical education platform"
                className="w-full h-auto rounded-2xl shadow-floating"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-3xl opacity-20 transform scale-105"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <div className="text-muted-foreground">Medical Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">50+</div>
            <div className="text-muted-foreground">Medical Topics</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">95%</div>
            <div className="text-muted-foreground">Pass Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-xp mb-2">4.9★</div>
            <div className="text-muted-foreground">Student Rating</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
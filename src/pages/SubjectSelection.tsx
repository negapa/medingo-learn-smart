import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Stethoscope, Check } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import subjectsData from '@/data/subjects.json';

const SubjectSelection = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleContinue = () => {
    if (selectedSubjects.length > 0) {
      updateUser({ selectedSubjects });
      navigate('/dashboard');
    }
  };

  const getSubjectColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      anatomy: 'border-anatomy bg-anatomy/10 hover:bg-anatomy/20',
      physiology: 'border-physiology bg-physiology/10 hover:bg-physiology/20',
      pharmacology: 'border-pharmacology bg-pharmacology/10 hover:bg-pharmacology/20',
      pathology: 'border-pathology bg-pathology/10 hover:bg-pathology/20',
      biochemistry: 'border-biochemistry bg-biochemistry/10 hover:bg-biochemistry/20',
    };
    return colorMap[color] || 'border-primary bg-primary/10 hover:bg-primary/20';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">Medingo</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Welcome, {user?.username}!
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Medical Subjects
            </h1>
            <p className="text-xl text-muted-foreground">
              Select the subjects you want to focus on. You can always add more later.
            </p>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {subjectsData.subjects.map((subject) => {
              const isSelected = selectedSubjects.includes(subject.id);
              const colorClass = getSubjectColorClass(subject.color);
              
              return (
                <Card
                  key={subject.id}
                  className={`cursor-pointer transition-all duration-200 border-2 ${
                    isSelected 
                      ? `${colorClass} ring-2 ring-offset-2 ring-primary` 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleSubjectToggle(subject.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl mb-2">{subject.icon}</div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {subject.name}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {subject.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{subject.totalLessons} lessons</span>
                      <span>{subject.estimatedTime}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={selectedSubjects.length === 0}
              className="min-w-48"
            >
              Start Learning ({selectedSubjects.length} selected)
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                // Select all subjects for demo
                const allSubjectIds = subjectsData.subjects.map(s => s.id);
                setSelectedSubjects(allSubjectIds);
              }}
            >
              Select All
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 bg-completed rounded-full"></div>
              <div className="w-8 h-2 bg-completed rounded-full"></div>
              <div className="w-8 h-2 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectSelection;
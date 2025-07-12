import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Stethoscope, Trophy, Flame, Star, ArrowLeft, Lock, CheckCircle, Play } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import subjectsData from '@/data/subjects.json';
import lessonsData from '@/data/lessons.json';

const Dashboard = () => {
  const { subjectId } = useParams();
  const { user } = useUser();

  // If no subjectId, show main dashboard
  if (!subjectId) {
    return <MainDashboard />;
  }

  // Show specific subject lessons
  return <SubjectLessons subjectId={subjectId} />;
};

const MainDashboard = () => {
  const { user } = useUser();

  if (!user?.selectedSubjects?.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No subjects selected</h2>
          <Link to="/subjects">
            <Button>Choose Subjects</Button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedSubjects = subjectsData.subjects.filter(subject => 
    user.selectedSubjects.includes(subject.id)
  );

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
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Button variant="ghost" size="sm">Profile</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="container mx-auto px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-primary text-white">
            <CardContent className="flex items-center gap-3 p-4">
              <Trophy className="w-8 h-8" />
              <div>
                <div className="text-2xl font-bold">{user?.xp || 0}</div>
                <div className="text-primary-foreground/80">Total XP</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-accent text-white">
            <CardContent className="flex items-center gap-3 p-4">
              <Flame className="w-8 h-8" />
              <div>
                <div className="text-2xl font-bold">{user?.streak || 0}</div>
                <div className="text-accent-foreground/80">Day Streak</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-success text-white">
            <CardContent className="flex items-center gap-3 p-4">
              <Star className="w-8 h-8" />
              <div>
                <div className="text-2xl font-bold">Level {user?.level || 1}</div>
                <div className="text-secondary-foreground/80">Current Level</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Your Medical Subjects</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedSubjects.map((subject) => {
              const completedLessons = user?.completedLessons?.filter(lessonId => 
                lessonId.startsWith(subject.id)
              ).length || 0;
              
              const progress = (completedLessons / subject.totalLessons) * 100;
              
              return (
                <Card key={subject.id} className="shadow-card hover:shadow-floating transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl">{subject.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {subject.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {subject.description}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{completedLessons}/{subject.totalLessons} lessons</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <Link to={`/subject/${subject.id}`}>
                      <Button className="w-full">
                        {completedLessons === 0 ? 'Start Learning' : 'Continue'}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

const SubjectLessons = ({ subjectId }: { subjectId: string }) => {
  const { user } = useUser();
  
  const subject = subjectsData.subjects.find(s => s.id === subjectId);
  const subjectLessons = (lessonsData as any)[subjectId]?.lessons || [];
  
  if (!subject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Subject not found</h2>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getLessonStatus = (lessonId: string, index: number) => {
    const completed = user?.completedLessons?.includes(lessonId);
    const isFirst = index === 0;
    const previousCompleted = index === 0 || user?.completedLessons?.includes(subjectLessons[index - 1]?.lessonId);
    
    if (completed) return 'completed';
    if (isFirst || previousCompleted) return 'available';
    return 'locked';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="text-2xl">{subject.icon}</div>
              <span className="text-2xl font-bold text-foreground">{subject.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Lesson Path */}
      <main className="container mx-auto px-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Learning Path</h1>
            <p className="text-muted-foreground">{subject.description}</p>
          </div>

          {/* Lesson Nodes */}
          <div className="space-y-6">
            {subjectLessons.map((lesson: any, index: number) => {
              const status = getLessonStatus(lesson.lessonId, index);
              const isLocked = status === 'locked';
              const isCompleted = status === 'completed';
              const isAvailable = status === 'available';

              return (
                <div key={lesson.lessonId} className="flex items-center gap-4">
                  {/* Lesson Node */}
                  <div className="relative">
                    <Button
                      variant={isCompleted ? 'progress' : isAvailable ? 'default' : 'locked'}
                      size="lesson"
                      disabled={isLocked}
                      className="relative"
                      asChild={!isLocked}
                    >
                      {isLocked ? (
                        <div>
                          <Lock className="w-6 h-6" />
                        </div>
                      ) : (
                        <Link to={`/lesson/${subjectId}/${lesson.lessonId}`}>
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Play className="w-6 h-6" />
                          )}
                        </Link>
                      )}
                    </Button>
                    
                    {/* Connecting Line */}
                    {index < subjectLessons.length - 1 && (
                      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-border"></div>
                    )}
                  </div>

                  {/* Lesson Info */}
                  <Card className={`flex-1 ${isLocked ? 'opacity-50' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{lesson.estimatedTime}</span>
                            <span>+{lesson.xpReward} XP</span>
                          </div>
                        </div>
                        {isCompleted && (
                          <div className="text-completed">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
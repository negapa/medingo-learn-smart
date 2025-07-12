import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, X, Trophy } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/hooks/use-toast';
import lessonsData from '@/data/lessons.json';

const Lesson = () => {
  const { subjectId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user, addXP, completeLesson, updateStreak } = useUser();
  
  const [currentScene, setCurrentScene] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const subjectLessons = (lessonsData as any)[subjectId || ''];
  const lesson = subjectLessons?.lessons?.find((l: any) => l.lessonId === lessonId);

  useEffect(() => {
    if (!lesson) {
      navigate('/dashboard');
    }
  }, [lesson, navigate]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const scenes = lesson.infoPage.scenes;
  const totalScenes = scenes.length + lesson.infoPage.finalReview.length;
  const currentProgress = ((currentScene + 1) / totalScenes) * 100;
  const isInFinalReview = currentScene >= scenes.length;
  const currentContent = isInFinalReview 
    ? lesson.infoPage.finalReview[currentScene - scenes.length]
    : scenes[currentScene];

  const handleAnswerSelect = (optionIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (!showAnswer && selectedAnswer !== null) {
      setShowAnswer(true);
      const correctAnswer = currentContent.question?.correctAnswer ?? currentContent.correctAnswer;
      const isCorrect = selectedAnswer === correctAnswer;
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
    } else if (showAnswer) {
      if (currentScene < totalScenes - 1) {
        setCurrentScene(prev => prev + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
      } else {
        // Lesson completed
        completeLesson(lesson.lessonId);
        addXP(lesson.xpReward);
        updateStreak();
        setLessonCompleted(true);
        
        toast({
          title: "Lesson Completed!",
          description: `You earned ${lesson.xpReward} XP!`,
        });
      }
    }
  };

  const handleBack = () => {
    if (currentScene > 0) {
      setCurrentScene(prev => prev - 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const getOptionClass = (optionIndex: number) => {
    if (!showAnswer) {
      return selectedAnswer === optionIndex 
        ? 'border-primary bg-primary/10' 
        : 'border-border hover:border-primary/50';
    }
    
    const correctAnswer = currentContent.question?.correctAnswer ?? currentContent.correctAnswer;
    const isCorrect = optionIndex === correctAnswer;
    const isSelected = optionIndex === selectedAnswer;
    
    if (isCorrect) {
      return 'border-completed bg-completed/10';
    } else if (isSelected && !isCorrect) {
      return 'border-destructive bg-destructive/10';
    }
    return 'border-border';
  };

  if (lessonCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center shadow-floating">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-2">Lesson Complete!</h2>
            <p className="text-muted-foreground mb-6">
              You scored {score}/{totalScenes} correct answers
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>XP Earned:</span>
                <span className="font-bold text-xp">+{lesson.xpReward}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Accuracy:</span>
                <span className="font-bold">{Math.round((score / totalScenes) * 100)}%</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/subject/${subjectId}`)}
                className="flex-1"
              >
                Continue Learning
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(`/subject/${subjectId}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {currentScene + 1} of {totalScenes}
            </div>
            <Progress value={currentProgress} className="w-32 h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-floating">
            <CardHeader>
              <CardTitle className="text-xl">
                {currentContent.sceneTitle || `Question ${currentScene - scenes.length + 1}`}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Dialogue (only for story scenes) */}
              {!isInFinalReview && currentContent.dialogue && (
                <div className="space-y-3">
                  {currentContent.dialogue.map((line: string, index: number) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <p className="text-foreground">{line}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Question */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {currentContent.question?.text || currentContent.text}
                </h3>

                {/* Answer Options */}
                <div className="space-y-3">
                  {(currentContent.question?.options || currentContent.options)?.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showAnswer}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${getOptionClass(index)}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showAnswer && index === (currentContent.question?.correctAnswer ?? currentContent.correctAnswer) && (
                          <CheckCircle className="w-5 h-5 text-completed" />
                        )}
                        {showAnswer && index === selectedAnswer && index !== (currentContent.question?.correctAnswer ?? currentContent.correctAnswer) && (
                          <X className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Explanation */}
                {showAnswer && (currentContent.question?.explanation || currentContent.explanation) && (
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-foreground">
                      <strong>Explanation: </strong>
                      {currentContent.question?.explanation || currentContent.explanation}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentScene === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={!showAnswer && selectedAnswer === null}
            >
              {currentScene === totalScenes - 1 ? 'Complete Lesson' : showAnswer ? 'Next' : 'Check Answer'}
              {currentScene < totalScenes - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lesson;
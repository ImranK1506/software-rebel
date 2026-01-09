import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, MessageSquare, Clock, Search, Download, Trash2, X } from 'lucide-react';

interface QuestionLog {
  timestamp: string;
  question: string;
  answer: string;
  wasHelpful: boolean | null;
}

interface Analytics {
  totalQuestions: number;
  topQuestions: { question: string; count: number }[];
  questionsOverTime: { date: string; count: number }[];
  averageQuestionLength: number;
  topics: { topic: string; count: number }[];
}

const ChatAnalyticsDashboard: React.FC = () => {
  const [logs, setLogs] = useState<QuestionLog[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    try {
      const storedLogs = localStorage.getItem('chatLogs');
      if (storedLogs) {
        const parsedLogs = JSON.parse(storedLogs);
        setLogs(parsedLogs);
        analyzeData(parsedLogs);
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
  };

  const analyzeData = (logData: QuestionLog[]) => {
    if (logData.length === 0) return;

    const totalQuestions = logData.length;

    const questionCounts: { [key: string]: number } = {};
    logData.forEach(log => {
      const normalized = log.question.toLowerCase().trim();
      questionCounts[normalized] = (questionCounts[normalized] || 0) + 1;
    });

    const topQuestions = Object.entries(questionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([question, count]) => ({ question, count }));

    const dateCount: { [key: string]: number } = {};
    logData.forEach(log => {
      const date = new Date(log.timestamp).toLocaleDateString();
      dateCount[date] = (dateCount[date] || 0) + 1;
    });

    const questionsOverTime = Object.entries(dateCount)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const totalLength = logData.reduce((sum, log) => sum + log.question.length, 0);
    const averageQuestionLength = Math.round(totalLength / totalQuestions);

    const topics = detectTopics(logData);

    setAnalytics({
      totalQuestions,
      topQuestions,
      questionsOverTime,
      averageQuestionLength,
      topics
    });
  };

  const detectTopics = (logData: QuestionLog[]) => {
    const keywords = {
      'Skills & Technologies': ['skill', 'technology', 'tech', 'react', 'vue', 'typescript', 'python', 'stencil'],
      'Availability & Hiring': ['available', 'hire', 'freelance', 'work', 'project', 'rate', 'cost'],
      'Experience': ['experience', 'years', 'worked', 'built', 'background'],
      'Projects': ['project', 'portfolio', 'built', 'created', 'example'],
      'Contact': ['contact', 'email', 'reach', 'get in touch', 'phone']
    };

    const topicCounts: { [key: string]: number } = {};

    logData.forEach(log => {
      const question = log.question.toLowerCase();
      Object.entries(keywords).forEach(([topic, words]) => {
        if (words.some(word => question.includes(word))) {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        }
      });
    });

    return Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([topic, count]) => ({ topic, count }));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const clearData = () => {
    if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
      localStorage.removeItem('chatLogs');
      setLogs([]);
      setAnalytics(null);
    }
  };

  const filteredLogs = logs.filter(log =>
    log.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-border/50 hover:border-primary/50"
          aria-label="Open analytics dashboard"
          title="View Chat Analytics"
        >
          <BarChart3 size={24} className="transition-transform duration-300 group-hover:rotate-12" />
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
            {logs.length}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-card border-2 border-border rounded-2xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="bg-gradient-to-r from-primary via-primary-glow to-primary text-primary-foreground px-8 py-6 rounded-t-2xl flex justify-between items-center shadow-lg">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold font-inter flex items-center gap-3">
              <BarChart3 size={32} className="drop-shadow-lg" />
              Chat Analytics Dashboard
            </h2>
            <p className="text-sm opacity-90 font-mono tracking-wide">
              Insights from <span className="font-bold">{logs.length}</span> conversations
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-primary-foreground/20 active:bg-primary-foreground/30 p-3 rounded-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
            aria-label="Close dashboard"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20 animate-in fade-in duration-500">
              <div className="bg-muted/50 rounded-full p-8 mb-6">
                <MessageSquare size={80} className="text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 font-inter">No Data Yet</h3>
              <p className="text-muted-foreground max-w-md text-lg">
                Chat analytics will appear here once visitors start using the AI assistant
              </p>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-background to-muted/30 border-2 border-border hover:border-primary/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Questions</span>
                    <MessageSquare size={20} className="text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-1 font-mono">{analytics?.totalQuestions}</div>
                  <div className="text-xs text-muted-foreground">All time</div>
                </div>

                <div className="bg-gradient-to-br from-background to-muted/30 border-2 border-border hover:border-primary/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Avg Length</span>
                    <TrendingUp size={20} className="text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-1 font-mono">{analytics?.averageQuestionLength}</div>
                  <div className="text-xs text-muted-foreground">characters</div>
                </div>

                <div className="bg-gradient-to-br from-background to-muted/30 border-2 border-border hover:border-primary/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Days</span>
                    <Clock size={20} className="text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-1 font-mono">
                    {analytics?.questionsOverTime.length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">days</div>
                </div>

                <div className="bg-gradient-to-br from-background to-muted/30 border-2 border-border hover:border-primary/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Top Topics</span>
                    <BarChart3 size={20} className="text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-1 font-mono">
                    {analytics?.topics.length || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">categories</div>
                </div>
              </div>

              {/* Top Questions */}
              <div className="bg-gradient-to-br from-background to-muted/20 border-2 border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-foreground mb-6 font-inter flex items-center gap-2">
                  <TrendingUp size={24} className="text-primary" />
                  Most Asked Questions
                </h3>
                <div className="space-y-5">
                  {analytics?.topQuestions.map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        <div className="flex-1 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.question}
                        </div>
                        <span className="text-base font-bold text-primary font-mono bg-primary/10 px-3 py-1 rounded-full">
                          {item.count}×
                        </span>
                      </div>
                      <div className="ml-12">
                        <div className="w-full bg-secondary/50 rounded-full h-3 overflow-hidden shadow-inner">
                          <div
                            className="bg-gradient-to-r from-primary to-primary-glow h-3 rounded-full transition-all duration-500 shadow-lg"
                            style={{ width: `${(item.count / analytics.totalQuestions) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics Distribution */}
              <div className="bg-gradient-to-br from-background to-muted/20 border-2 border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-foreground mb-6 font-inter flex items-center gap-2">
                  <BarChart3 size={24} className="text-primary" />
                  Topics of Interest
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analytics?.topics.map((topic, idx) => (
                    <div key={idx} className="bg-card border-2 border-border hover:border-primary/50 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                      <div className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                        {topic.topic}
                      </div>
                      <div className="text-3xl font-bold text-primary mb-1 font-mono group-hover:scale-110 transition-transform inline-block">
                        {topic.count}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono bg-muted/30 inline-block px-2 py-1 rounded">
                        {Math.round((topic.count / analytics.totalQuestions) * 100)}% of questions
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Conversations */}
              <div className="bg-gradient-to-br from-background to-muted/20 border-2 border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h3 className="text-xl font-bold text-foreground font-inter flex items-center gap-2">
                    <MessageSquare size={24} className="text-primary" />
                    Recent Conversations
                  </h3>
                  <div className="relative flex-shrink-0 sm:w-80">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-background border-2 border-input hover:border-primary/50 focus:border-primary rounded-xl pl-12 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                  {filteredLogs.slice().reverse().map((log, idx) => (
                    <div key={idx} className="bg-card border-2 border-border hover:border-primary/50 rounded-xl p-6 space-y-4 transition-all duration-300 hover:shadow-lg group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="text-xs font-bold text-primary uppercase tracking-wider">Question:</div>
                          <div className="text-base text-foreground font-medium leading-relaxed">
                            {log.question}
                          </div>
                        </div>
                        <span className="flex-shrink-0 text-xs text-muted-foreground font-mono bg-muted/30 px-3 py-1.5 rounded-lg whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="space-y-2 pt-4 border-t border-border/50">
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Answer:</div>
                        <div className="text-sm text-foreground/80 leading-relaxed">
                          {log.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t-2 border-border px-8 py-5 bg-muted/30 rounded-b-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted-foreground font-mono bg-background/50 px-4 py-2 rounded-lg border border-border">
            Last updated: {logs.length > 0 ? new Date(logs[logs.length - 1].timestamp).toLocaleString() : 'N/A'}
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportData}
              disabled={logs.length === 0}
              className="flex items-center gap-2 bg-primary hover:bg-primary-glow disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50 text-primary-foreground px-6 py-3 rounded-xl transition-all duration-200 text-sm font-semibold hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/20 active:scale-95"
            >
              <Download size={18} />
              Export Data
            </button>
            <button
              onClick={clearData}
              disabled={logs.length === 0}
              className="flex items-center gap-2 bg-destructive hover:bg-destructive/90 disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50 text-destructive-foreground px-6 py-3 rounded-xl transition-all duration-200 text-sm font-semibold hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-destructive/20 active:scale-95"
            >
              <Trash2 size={18} />
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAnalyticsDashboard;

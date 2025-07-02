import React, { useState } from "react";
import {
  Calendar,
  DollarSign,
  CheckSquare,
  Clock,
  TrendingUp,
  AlertTriangle,
  Edit2,
  Trash2,
  Play,
  Menu,
  X,
} from "lucide-react";

const AIPersonalAssistant = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState({});
  const [weeklyBudgets, setWeeklyBudgets] = useState({
    0: {
      budget: 500,
      categoryLimits: {
        Food: 100,
        Transport: 80,
        Entertainment: 50,
        Shopping: 70,
        Other: 50,
      },
    },
  });

  // Form visibility states
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showMonthlyExpenseForm, setShowMonthlyExpenseForm] = useState(false);
  const [showMonthlyIncomeForm, setShowMonthlyIncomeForm] = useState(false);
  const [showWorkSessionForm, setShowWorkSessionForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [editingTask, setEditingTask] = useState({
    projectName: null,
    taskIndex: null,
    text: "",
  });
  const [editingProject, setEditingProject] = useState({
    projectName: null,
    field: null,
    value: "",
  });
  const [loggingWork, setLoggingWork] = useState({
    projectName: null,
    money: "",
    time: "",
  });

  // Week/Month navigation
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);

  // State for expenses - simplified data structure
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "Coffee",
      amount: 20,
      category: "Food",
      date: "2025-06-29",
      type: "weekly",
      week: 0,
    },
    {
      id: 2,
      description: "Burger King meal",
      amount: 25,
      category: "Food",
      date: "2025-06-29",
      type: "weekly",
      week: 0,
    },
    {
      id: 3,
      description: "Shoes",
      amount: 80,
      category: "Shopping",
      date: "2025-06-29",
      type: "weekly",
      week: 0,
    },
    {
      id: 4,
      description: "T-shirt",
      amount: 20,
      category: "Shopping",
      date: "2025-06-29",
      type: "weekly",
      week: 0,
    },
  ]);

  // State for monthly data - organized by month offset
  const [monthlyData, setMonthlyData] = useState({
    0: {
      // Current month
      expenses: [
        { id: 1, name: "Rent", amount: 450, planned: true, paid: false },
        {
          id: 2,
          name: "Health Insurance",
          amount: 150,
          planned: true,
          paid: false,
        },
        { id: 3, name: "Groceries", amount: 300, planned: true, paid: false },
        {
          id: 4,
          name: "TradingView/Claude AI",
          amount: 100,
          planned: true,
          paid: false,
        },
      ],
      income: [
        { id: 1, source: "Primary Job", amount: 2500, received: true },
        { id: 2, source: "Freelance Work", amount: 800, received: false },
        { id: 3, source: "Trading Profits", amount: 300, received: true },
      ],
      budget: 2000,
    },
  });

  // Get current month data with defaults
  const getCurrentMonthData = () => {
    return (
      monthlyData[currentMonth] || {
        expenses: [],
        income: [],
        budget: 2000,
      }
    );
  };

  const currentMonthData = getCurrentMonthData();
  const monthlyExpenses = currentMonthData.expenses;
  const monthlyIncome = currentMonthData.income;
  const monthlyBudget = currentMonthData.budget;

  // Update monthly data for current month
  const updateMonthlyData = (updates) => {
    setMonthlyData((prev) => ({
      ...prev,
      [currentMonth]: {
        ...getCurrentMonthData(),
        ...updates,
      },
    }));
  };

  // Get budget data for current week
  const getBudgetForWeek = (week) => {
    return (
      weeklyBudgets[week] || {
        budget: 500,
        categoryLimits: {
          Food: 100,
          Transport: 80,
          Entertainment: 50,
          Shopping: 70,
          Other: 50,
        },
      }
    );
  };

  const currentBudget = getBudgetForWeek(currentWeek);
  const currentWeeklyBudget = currentBudget.budget;
  const currentCategoryLimits = currentBudget.categoryLimits;

  // State for projects - simplified data structure
  const [projects, setProjects] = useState({
    "Weekly Outlook Bitcoin": {
      status: "In Progress",
      budget_allocated: 0,
      time_allocated_hours: 8,
      tasks: [
        { step: "Analyze current BTC price action", done: false },
        { step: "Review weekly support/resistance levels", done: false },
        { step: "Check on-chain metrics and indicators", done: false },
        { step: "Review market sentiment and news", done: true },
        { step: "Check economical news", done: false },
        {
          step: "Check hot topics politics and bitcoin legislation",
          done: true,
        },
        { step: "Identify key levels for next week", done: false },
        { step: "Write weekly outlook summary", done: false },
      ],
      start_date: "2025-06-28",
      due_date: "2025-07-02",
      time_logged: 2.5,
      money_spent: 0,
      notes: [],
      priority: "High",
    },
    "Personal Website Redesign": {
      status: "Planning",
      budget_allocated: 200,
      time_allocated_hours: 15,
      tasks: [
        { step: "Research modern design trends", done: true },
        { step: "Create wireframes", done: false },
        { step: "Choose color palette", done: false },
        { step: "Build responsive layout", done: false },
        { step: "Add portfolio section", done: false },
        { step: "Optimize for SEO", done: false },
      ],
      start_date: "2025-07-01",
      due_date: "2025-07-15",
      time_logged: 3,
      money_spent: 50,
      notes: [],
      priority: "Medium",
    },
  });

  // New project form state
  const [newProject, setNewProject] = useState({
    name: "",
    status: "Planning",
    budget_allocated: "",
    time_allocated_hours: "",
    start_date: new Date().toISOString().split("T")[0],
    due_date: "",
    priority: "Medium",
    tasks: [""],
  });

  // State for tasks
  const [quickTasks, setQuickTasks] = useState([
    {
      id: 1,
      title: "Complete Bitcoin analysis report",
      urgency: "Urgent",
      importance: "Important",
      priority: "Do First",
      completed: false,
      created: "2025-06-29",
    },
    {
      id: 2,
      title: "Plan next week's trading strategy",
      urgency: "Not Urgent",
      importance: "Important",
      priority: "Schedule",
      completed: false,
      created: "2025-06-29",
    },
    {
      id: 3,
      title: "Check crypto news updates",
      urgency: "Urgent",
      importance: "Not Important",
      priority: "Delegate",
      completed: false,
      created: "2025-06-29",
    },
  ]);

  // State for calendar/scheduling
  const [workSessions, setWorkSessions] = useState([
    {
      id: 1,
      title: "Bitcoin Weekly Outlook",
      date: "2025-06-29",
      time: "16:00",
      duration: 180,
      status: "scheduled",
    },
    {
      id: 2,
      title: "Dentist Appointment",
      date: "2025-06-30",
      time: "10:00",
      duration: 60,
      status: "scheduled",
    },
  ]);

  // State for notes
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Market Research Ideas",
      content:
        "Look into DeFi trends, check Ethereum merge impact, research altcoin season patterns",
      category: "Research",
      priority: "Medium",
      created: "2025-06-29",
    },
    {
      id: 2,
      title: "App Features to Add",
      content:
        "Voice input for expenses, better charts, notification system, export to CSV",
      category: "Ideas",
      priority: "Low",
      created: "2025-06-29",
    },
  ]);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "Ideas",
    priority: "Medium",
  });

  // State for new forms
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "Food",
  });
  const [newMonthlyExpense, setNewMonthlyExpense] = useState({
    name: "",
    amount: "",
    planned: true,
  });
  const [newMonthlyIncome, setNewMonthlyIncome] = useState({
    source: "",
    amount: "",
  });
  const [newWorkSession, setNewWorkSession] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    duration: 60,
  });
  const [newQuickTask, setNewQuickTask] = useState({
    title: "",
    urgency: "Urgent",
    importance: "Important",
  });
  const [newBudget, setNewBudget] = useState({
    budget: "",
    categoryName: "",
    categoryLimit: "",
  });

  // Helper function with null checks
  const safeAccess = (obj, path, defaultValue = null) => {
    try {
      return (
        path
          .split(".")
          .reduce((current, key) => current && current[key], obj) ||
        defaultValue
      );
    } catch (error) {
      console.warn("Safe access failed:", error);
      return defaultValue;
    }
  };

  // Budget management functions
  const updateWeeklyBudget = (week, budget) => {
    setWeeklyBudgets((prev) => ({
      ...prev,
      [week]: {
        ...getBudgetForWeek(week),
        budget: parseFloat(budget) || 500,
      },
    }));
  };

  const addCategory = (week, name, limit) => {
    if (!name?.trim()) return;
    setWeeklyBudgets((prev) => ({
      ...prev,
      [week]: {
        ...getBudgetForWeek(week),
        categoryLimits: {
          ...getBudgetForWeek(week).categoryLimits,
          [name]: parseFloat(limit) || 0,
        },
      },
    }));
  };

  const deleteCategory = (week, name) => {
    setWeeklyBudgets((prev) => {
      const newCategoryLimits = { ...getBudgetForWeek(week).categoryLimits };
      delete newCategoryLimits[name];
      return {
        ...prev,
        [week]: {
          ...getBudgetForWeek(week),
          categoryLimits: newCategoryLimits,
        },
      };
    });
  };

  // Task management functions (NEW)
  const addTaskToProject = (projectName, taskText) => {
    if (!taskText?.trim() || !projects[projectName]) return;

    try {
      setProjects((prev) => ({
        ...prev,
        [projectName]: {
          ...prev[projectName],
          tasks: [
            ...(prev[projectName].tasks || []),
            { step: taskText.trim(), done: false },
          ],
        },
      }));
    } catch (error) {
      console.error("Error adding task to project:", error);
    }
  };

  const updateProjectTaskText = (projectName, taskIndex, newText) => {
    if (!newText?.trim() || !projects[projectName]?.tasks?.[taskIndex]) return;

    try {
      setProjects((prev) => ({
        ...prev,
        [projectName]: {
          ...prev[projectName],
          tasks: prev[projectName].tasks.map((task, index) =>
            index === taskIndex ? { ...task, step: newText.trim() } : task
          ),
        },
      }));
    } catch (error) {
      console.error("Error updating task text:", error);
    }
  };

  const deleteProjectTask = (projectName, taskIndex) => {
    if (!projects[projectName]?.tasks?.[taskIndex]) return;

    try {
      setProjects((prev) => ({
        ...prev,
        [projectName]: {
          ...prev[projectName],
          tasks: prev[projectName].tasks.filter(
            (_, index) => index !== taskIndex
          ),
        },
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Project budget/time management functions (NEW)
  const updateProjectBudget = (projectName, newBudget) => {
    if (!projects[projectName] || newBudget < 0) return;

    try {
      setProjects((prev) => ({
        ...prev,
        [projectName]: {
          ...prev[projectName],
          budget_allocated: parseFloat(newBudget) || 0,
        },
      }));
    } catch (error) {
      console.error("Error updating project budget:", error);
    }
  };

  const updateProjectTime = (projectName, newTime) => {
    if (!projects[projectName] || newTime < 0) return;

    try {
      setProjects((prev) => ({
        ...prev,
        [projectName]: {
          ...prev[projectName],
          time_allocated_hours: parseFloat(newTime) || 0,
        },
      }));
    } catch (error) {
      console.error("Error updating project time:", error);
    }
  };

  const logProjectMoney = (projectName, amount) => {
    if (!projects[projectName] || amount <= 0) return;

    try {
      setProjects((prev) => ({
        ...prev,
        [projectName]: {
          ...prev[projectName],
          money_spent:
            (prev[projectName].money_spent || 0) + parseFloat(amount),
        },
      }));
    } catch (error) {
      console.error("Error logging project money:", error);
    }
  };

  const logProjectTime = (projectName, hours) => {
    if (!projects[projectName] || hours <= 0) return;

    try {
      setProjects((prev) => ({
        ...prev,
        [projectName]: {
          ...prev[projectName],
          time_logged: (prev[projectName].time_logged || 0) + parseFloat(hours),
        },
      }));
    } catch (error) {
      console.error("Error logging project time:", error);
    }
  };

  // Add new project with proper validation and state management
  const addProject = () => {
    if (!newProject.name?.trim()) {
      console.warn("Project name is required");
      return;
    }

    try {
      const project = {
        status: newProject.status || "Planning",
        budget_allocated: parseFloat(newProject.budget_allocated) || 0,
        time_allocated_hours: parseFloat(newProject.time_allocated_hours) || 0,
        tasks: (newProject.tasks || [])
          .filter((task) => task?.trim())
          .map((task) => ({ step: task, done: false })),
        start_date:
          newProject.start_date || new Date().toISOString().split("T")[0],
        due_date: newProject.due_date || "",
        time_logged: 0,
        money_spent: 0,
        notes: [],
        priority: newProject.priority || "Medium",
      };

      setProjects((prev) => ({ ...prev, [newProject.name]: project }));
      setNewProject({
        name: "",
        status: "Planning",
        budget_allocated: "",
        time_allocated_hours: "",
        start_date: new Date().toISOString().split("T")[0],
        due_date: "",
        priority: "Medium",
        tasks: [""],
      });
      setShowProjectForm(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  // Add task to new project form with validation
  const addTaskToNewProject = () => {
    try {
      setNewProject((prev) => ({
        ...prev,
        tasks: [...(prev.tasks || []), ""],
      }));
    } catch (error) {
      console.error("Error adding task to project:", error);
    }
  };

  // Remove task from new project form with validation
  const removeTaskFromNewProject = (index) => {
    try {
      if (index >= 0 && newProject.tasks && index < newProject.tasks.length) {
        const updatedTasks = newProject.tasks.filter((_, i) => i !== index);
        setNewProject((prev) => ({ ...prev, tasks: updatedTasks }));
      }
    } catch (error) {
      console.error("Error removing task from project:", error);
    }
  };

  // Update task in new project form with validation
  const updateTaskInNewProject = (index, value) => {
    try {
      if (index >= 0 && newProject.tasks && index < newProject.tasks.length) {
        const updatedTasks = [...newProject.tasks];
        updatedTasks[index] = value || "";
        setNewProject((prev) => ({ ...prev, tasks: updatedTasks }));
      }
    } catch (error) {
      console.error("Error updating task in project:", error);
    }
  };

  // Add new expense with validation and proper state management
  const addExpense = () => {
    if (!newExpense.description?.trim() || !newExpense.amount) {
      console.warn("Description and amount are required");
      return;
    }

    try {
      const expense = {
        id: Date.now(),
        description: newExpense.description.trim(),
        amount: parseFloat(newExpense.amount) || 0,
        category: newExpense.category || "Other",
        date: new Date().toLocaleDateString(),
        type: "weekly",
        week: currentWeek,
      };

      setExpenses((prev) => [...prev, expense]);
      setNewExpense({ description: "", amount: "", category: "Food" });
      setShowExpenseForm(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Add new monthly expense with validation
  const addMonthlyExpense = () => {
    if (!newMonthlyExpense.name?.trim() || !newMonthlyExpense.amount) {
      console.warn("Name and amount are required");
      return;
    }

    try {
      const expense = {
        id: Date.now(),
        name: newMonthlyExpense.name.trim(),
        amount: parseFloat(newMonthlyExpense.amount) || 0,
        planned: Boolean(newMonthlyExpense.planned),
        paid: false,
      };

      const currentExpenses = getCurrentMonthData().expenses;
      updateMonthlyData({ expenses: [...currentExpenses, expense] });
      setNewMonthlyExpense({ name: "", amount: "", planned: true });
      setShowMonthlyExpenseForm(false);
    } catch (error) {
      console.error("Error adding monthly expense:", error);
    }
  };

  // Add new monthly income with validation
  const addMonthlyIncome = () => {
    if (!newMonthlyIncome.source?.trim() || !newMonthlyIncome.amount) {
      console.warn("Source and amount are required");
      return;
    }

    try {
      const income = {
        id: Date.now(),
        source: newMonthlyIncome.source.trim(),
        amount: parseFloat(newMonthlyIncome.amount) || 0,
        received: false,
      };

      const currentIncome = getCurrentMonthData().income;
      updateMonthlyData({ income: [...currentIncome, income] });
      setNewMonthlyIncome({ source: "", amount: "" });
      setShowMonthlyIncomeForm(false);
    } catch (error) {
      console.error("Error adding monthly income:", error);
    }
  };

  // Add new work session with validation
  const addWorkSession = () => {
    if (
      !newWorkSession.title?.trim() ||
      !newWorkSession.date ||
      !newWorkSession.time
    ) {
      console.warn("Title, date and time are required");
      return;
    }

    try {
      const session = {
        id: Date.now(),
        title: newWorkSession.title.trim(),
        date: newWorkSession.date,
        time: newWorkSession.time,
        duration: parseInt(newWorkSession.duration) || 60,
        status: "scheduled",
      };

      setWorkSessions((prev) => [...prev, session]);
      setNewWorkSession({
        title: "",
        date: new Date().toISOString().split("T")[0],
        time: "09:00",
        duration: 60,
      });
      setShowWorkSessionForm(false);
    } catch (error) {
      console.error("Error adding work session:", error);
    }
  };

  // Add new quick task with validation
  const addQuickTask = () => {
    if (!newQuickTask.title?.trim()) {
      console.warn("Task title is required");
      return;
    }

    try {
      // Determine priority based on urgency and importance
      let priority = "Don't Do";
      if (
        newQuickTask.urgency === "Urgent" &&
        newQuickTask.importance === "Important"
      ) {
        priority = "Do First";
      } else if (
        newQuickTask.urgency === "Not Urgent" &&
        newQuickTask.importance === "Important"
      ) {
        priority = "Schedule";
      } else if (
        newQuickTask.urgency === "Urgent" &&
        newQuickTask.importance === "Not Important"
      ) {
        priority = "Delegate";
      }

      const task = {
        id: Date.now(),
        title: newQuickTask.title.trim(),
        urgency: newQuickTask.urgency || "Not Urgent",
        importance: newQuickTask.importance || "Not Important",
        priority: priority,
        completed: false,
        created: new Date().toLocaleDateString(),
      };

      setQuickTasks((prev) => [...prev, task]);
      setNewQuickTask({
        title: "",
        urgency: "Urgent",
        importance: "Important",
      });
      setShowTaskForm(false);
    } catch (error) {
      console.error("Error adding quick task:", error);
    }
  };

  // Get priority color and info with null checks
  const getPriorityInfo = (priority) => {
    const priorityMap = {
      "Do First": {
        color: "bg-blue-500/20 text-blue-300 border-blue-400/30",
        icon: "🔥",
        description: "Urgent & Important",
      },
      Schedule: {
        color: "bg-green-500/20 text-green-300 border-green-400/30",
        icon: "📅",
        description: "Important, Not Urgent",
      },
      Delegate: {
        color: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
        icon: "👥",
        description: "Urgent, Not Important",
      },
      "Don't Do": {
        color: "bg-red-500/20 text-red-300 border-red-400/30",
        icon: "🚫",
        description: "Not Urgent, Not Important",
      },
    };

    return (
      priorityMap[priority] || {
        color: "bg-gray-500/20 text-gray-300 border-gray-400/30",
        icon: "📝",
        description: "Unassigned",
      }
    );
  };

  // Sort tasks by priority with null checks
  const sortedTasks = [...(quickTasks || [])].sort((a, b) => {
    const priorityOrder = ["Do First", "Schedule", "Delegate", "Don't Do"];
    const aPriority = priorityOrder.indexOf(a?.priority || "Don't Do");
    const bPriority = priorityOrder.indexOf(b?.priority || "Don't Do");
    return aPriority - bPriority;
  });

  // Add new note with validation
  const addNote = () => {
    if (!newNote.title?.trim() || !newNote.content?.trim()) {
      console.warn("Title and content are required");
      return;
    }

    try {
      const note = {
        id: Date.now(),
        title: newNote.title.trim(),
        content: newNote.content.trim(),
        category: newNote.category || "Ideas",
        priority: newNote.priority || "Medium",
        created: new Date().toLocaleDateString(),
      };

      setNotes((prev) => [note, ...prev]);
      setNewNote({
        title: "",
        content: "",
        category: "Ideas",
        priority: "Medium",
      });
      setShowNoteForm(false);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete note with validation
  const deleteNote = (id) => {
    try {
      if (id) {
        setNotes((prev) => prev.filter((note) => note?.id !== id));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Get month name from offset
  const getMonthName = (offset) => {
    const currentDate = new Date();
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1
    );
    return targetDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Calculate totals with null checks
  const weeklyExpensesTotal = (expenses || [])
    .filter((e) => e?.type === "weekly" && e?.week === currentWeek)
    .reduce((sum, e) => sum + (parseFloat(e?.amount) || 0), 0);

  const monthlyExpensesTotal = (monthlyExpenses || [])
    .filter((e) => e?.paid)
    .reduce((sum, e) => sum + (parseFloat(e?.amount) || 0), 0);

  const monthlyIncomePaid = (monthlyIncome || [])
    .filter((i) => i?.received)
    .reduce((sum, i) => sum + (parseFloat(i?.amount) || 0), 0);

  const monthlyIncomeTotal = (monthlyIncome || []).reduce(
    (sum, i) => sum + (parseFloat(i?.amount) || 0),
    0
  );

  const remainingWeeklyBudget = currentWeeklyBudget - weeklyExpensesTotal;
  const remainingMonthlyBudget = monthlyIncomePaid - monthlyExpensesTotal;

  // Category spending with null checks
  const categorySpending = (expenses || [])
    .filter((e) => e?.week === currentWeek)
    .reduce((acc, expense) => {
      if (expense?.category && expense?.amount) {
        acc[expense.category] =
          (acc[expense.category] || 0) + parseFloat(expense.amount);
      }
      return acc;
    }, {});

  // Update project task with validation
  const updateProjectTask = (projectName, taskIndex, done) => {
    try {
      if (projects[projectName]?.tasks?.[taskIndex]) {
        setProjects((prev) => ({
          ...prev,
          [projectName]: {
            ...prev[projectName],
            tasks: prev[projectName].tasks.map((task, index) =>
              index === taskIndex ? { ...task, done: Boolean(done) } : task
            ),
          },
        }));
      }
    } catch (error) {
      console.error("Error updating project task:", error);
    }
  };

  // Get project completion percentage with null checks
  const getProjectCompletion = (project) => {
    try {
      if (
        !project?.tasks ||
        !Array.isArray(project.tasks) ||
        project.tasks.length === 0
      ) {
        return 0;
      }
      const completedTasks = project.tasks.filter(
        (task) => task?.done === true
      ).length;
      return Math.round((completedTasks / project.tasks.length) * 100);
    } catch (error) {
      console.error("Error calculating project completion:", error);
      return 0;
    }
  };

  // Update monthly expense paid status
  const updateMonthlyExpensePaid = (expenseId, paid) => {
    try {
      const updatedExpenses = monthlyExpenses.map((exp) =>
        exp?.id === expenseId ? { ...exp, paid: Boolean(paid) } : exp
      );
      updateMonthlyData({ expenses: updatedExpenses });
    } catch (error) {
      console.error("Error updating monthly expense:", error);
    }
  };

  // Update monthly income received status
  const updateMonthlyIncomeReceived = (incomeId, received) => {
    try {
      const updatedIncome = monthlyIncome.map((inc) =>
        inc?.id === incomeId ? { ...inc, received: Boolean(received) } : inc
      );
      updateMonthlyData({ income: updatedIncome });
    } catch (error) {
      console.error("Error updating monthly income:", error);
    }
  };

  // Daily briefing with null checks
  const getDailyBriefing = () => {
    try {
      const todaysDate = new Date().toLocaleDateString();
      const activeProjects = Object.keys(projects || {}).filter(
        (key) => safeAccess(projects, `${key}.status`) === "In Progress"
      ).length;
      const urgentTasks = (quickTasks || []).filter(
        (task) => !task?.completed && task?.priority === "Do First"
      ).length;

      return {
        date: todaysDate,
        budgetStatus: remainingWeeklyBudget > 0 ? "On track" : "Over budget",
        activeProjects,
        urgentTasks,
        scheduledSessions: (workSessions || []).filter(
          (s) => s?.status === "scheduled"
        ).length,
      };
    } catch (error) {
      console.error("Error generating daily briefing:", error);
      return {
        date: new Date().toLocaleDateString(),
        budgetStatus: "Unknown",
        activeProjects: 0,
        urgentTasks: 0,
        scheduledSessions: 0,
      };
    }
  };

  const briefing = getDailyBriefing();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-md shadow-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI Personal Assistant
            </h1>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-cyan-400 hover:text-cyan-300 hover:bg-gray-800/50 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black/30 backdrop-blur-md shadow-lg border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: TrendingUp },
              { id: "budget", label: "Weekly Budget", icon: DollarSign },
              { id: "monthly", label: "Monthly Budget", icon: Calendar },
              { id: "projects", label: "Projects", icon: CheckSquare },
              { id: "schedule", label: "Schedule", icon: Clock },
              { id: "notes", label: "Notes", icon: Edit2 },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-4 font-medium text-sm transition-all duration-200 relative group ${
                    activeTab === tab.id
                      ? "text-cyan-400 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b-2 border-cyan-400"
                      : "text-gray-400 hover:text-cyan-300 hover:bg-gray-800/30"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Navigation Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden py-2 border-t border-cyan-500/20">
              {[
                { id: "dashboard", label: "Dashboard", icon: TrendingUp },
                { id: "budget", label: "Weekly Budget", icon: DollarSign },
                { id: "monthly", label: "Monthly Budget", icon: Calendar },
                { id: "projects", label: "Projects", icon: CheckSquare },
                { id: "schedule", label: "Schedule", icon: Clock },
                { id: "notes", label: "Notes", icon: Edit2 },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center py-3 px-4 text-left font-medium text-sm transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-r-2 border-cyan-400"
                        : "text-gray-400 hover:bg-gray-800/30 hover:text-cyan-300"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Tab Title */}
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-gray-400">
                Your daily overview and key metrics
              </p>
            </div>

            {/* Daily Briefing */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Daily Briefing - {briefing.date}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-400/30 backdrop-blur-sm">
                  <div className="text-sm text-blue-300 font-medium">
                    Budget Status
                  </div>
                  <div className="text-lg font-bold text-blue-100">
                    {briefing.budgetStatus}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-400/30 backdrop-blur-sm">
                  <div className="text-sm text-green-300 font-medium">
                    Active Projects
                  </div>
                  <div className="text-lg font-bold text-green-100">
                    {briefing.activeProjects}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-4 rounded-xl border border-yellow-400/30 backdrop-blur-sm">
                  <div className="text-sm text-yellow-300 font-medium">
                    Urgent Tasks
                  </div>
                  <div className="text-lg font-bold text-yellow-100">
                    {briefing.urgentTasks}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-400/30 backdrop-blur-sm">
                  <div className="text-sm text-purple-300 font-medium">
                    Scheduled Sessions
                  </div>
                  <div className="text-lg font-bold text-purple-100">
                    {briefing.scheduledSessions}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Weekly Overview
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Budget:</span>
                    <span className="font-medium text-cyan-400">
                      €{currentWeeklyBudget}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Spent:</span>
                    <span className="font-medium text-blue-400">
                      €{weeklyExpensesTotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Remaining:</span>
                    <span
                      className={`font-bold ${
                        remainingWeeklyBudget >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      €{remainingWeeklyBudget}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Active Projects
                </h3>
                <div className="space-y-2">
                  {Object.entries(projects || {})
                    .slice(0, 3)
                    .map(([name, project]) => (
                      <div
                        key={name}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm truncate text-gray-300">
                          {name}
                        </span>
                        <span className="text-xs bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-cyan-300 px-2 py-1 rounded-full border border-cyan-400/30">
                          {getProjectCompletion(project)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === "budget" && (
          <div className="space-y-6">
            {/* Tab Title */}
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Weekly Budget
              </h1>
              <p className="text-gray-400">
                Track your weekly expenses and spending limits
              </p>
            </div>

            {/* Week Navigation */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentWeek(currentWeek - 1)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-4 py-2 rounded-xl transition-all duration-200"
                >
                  ← Previous Week
                </button>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">
                    {currentWeek === 0
                      ? "Current Week"
                      : currentWeek > 0
                      ? `${currentWeek} Week${currentWeek > 1 ? "s" : ""} Ahead`
                      : `${Math.abs(currentWeek)} Week${
                          Math.abs(currentWeek) > 1 ? "s" : ""
                        } Ago`}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    June 23 - June 29, 2025
                  </p>
                </div>
                <button
                  onClick={() => setCurrentWeek(currentWeek + 1)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-4 py-2 rounded-xl transition-all duration-200"
                >
                  Next Week →
                </button>
              </div>
            </div>

            {/* Add New Expense Button */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowExpenseForm(!showExpenseForm)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-medium px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-green-500/25 text-lg"
              >
                {showExpenseForm ? "− Hide Form" : "+ Add New Expense"}
              </button>
              <button
                onClick={() => {
                  console.log("Budget button clicked");
                  console.log("Current showBudgetForm state:", showBudgetForm);
                  try {
                    setShowBudgetForm(!showBudgetForm);
                    console.log("Setting showBudgetForm to:", !showBudgetForm);
                  } catch (error) {
                    console.error("Error toggling budget form:", error);
                  }
                }}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-medium px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 text-lg"
              >
                {showBudgetForm ? "− Hide Adjust" : "⚙️ Adjust Budget"}
              </button>
            </div>

            {/* Add New Expense Form */}
            {showExpenseForm && (
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  💰 Add New Expense
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="What did you buy?"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        description: e.target.value,
                      })
                    }
                    className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <input
                    type="number"
                    placeholder="Amount (€)"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: e.target.value })
                    }
                    className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <select
                    value={newExpense.category}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, category: e.target.value })
                    }
                    className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  >
                    <option value="Food">🍕 Food</option>
                    <option value="Transport">🚗 Transport</option>
                    <option value="Entertainment">🎬 Entertainment</option>
                    <option value="Shopping">🛍️ Shopping</option>
                    <option value="Other">📦 Other</option>
                  </select>
                  <button
                    onClick={addExpense}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                  >
                    ➕ Add Expense
                  </button>
                </div>
              </div>
            )}

            {/* Budget Adjustment Form */}
            {showBudgetForm && (
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  ⚙️ Adjust Budget
                </h2>

                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-2">
                    Weekly Budget
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="Weekly budget (€)"
                      value={newBudget.budget}
                      onChange={(e) =>
                        setNewBudget({ ...newBudget, budget: e.target.value })
                      }
                      className="flex-1 bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      onClick={() => {
                        if (newBudget.budget) {
                          updateWeeklyBudget(currentWeek, newBudget.budget);
                          setNewBudget({ ...newBudget, budget: "" });
                        }
                      }}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-6 py-3 rounded-xl transition-all duration-200"
                    >
                      Update
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Current: €{currentWeeklyBudget}
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-2">
                    Add Category
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Category name"
                      value={newBudget.categoryName}
                      onChange={(e) =>
                        setNewBudget({
                          ...newBudget,
                          categoryName: e.target.value,
                        })
                      }
                      className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      type="number"
                      placeholder="Budget limit (€)"
                      value={newBudget.categoryLimit}
                      onChange={(e) =>
                        setNewBudget({
                          ...newBudget,
                          categoryLimit: e.target.value,
                        })
                      }
                      className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      onClick={() => {
                        if (newBudget.categoryName && newBudget.categoryLimit) {
                          addCategory(
                            currentWeek,
                            newBudget.categoryName,
                            newBudget.categoryLimit
                          );
                          setNewBudget({
                            ...newBudget,
                            categoryName: "",
                            categoryLimit: "",
                          });
                        }
                      }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white px-6 py-3 rounded-xl transition-all duration-200"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-2">
                    Current Categories
                  </label>
                  <div className="space-y-2">
                    {Object.entries(currentCategoryLimits).map(
                      ([category, limit]) => (
                        <div
                          key={category}
                          className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl border border-gray-600/30"
                        >
                          <span className="text-white font-medium">
                            {category}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-300">€{limit}</span>
                            <button
                              onClick={() =>
                                deleteCategory(currentWeek, category)
                              }
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded-lg transition-all duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setShowBudgetForm(false)}
                  className="bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 px-6 py-3 rounded-xl transition-all duration-200"
                >
                  Close
                </button>
              </div>
            )}

            {/* Category Limits */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Category Limits & Spending
              </h2>

              {/* Weekly Budget Summary */}
              <div className="mb-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-400/20">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Weekly Budget Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-xl border border-blue-400/30">
                    <div className="text-sm text-blue-300 font-medium">
                      Total Budget
                    </div>
                    <div className="text-xl font-bold text-blue-100">
                      €{currentWeeklyBudget}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-3 rounded-xl border border-orange-400/30">
                    <div className="text-sm text-orange-300 font-medium">
                      Total Spent
                    </div>
                    <div className="text-xl font-bold text-orange-100">
                      €{weeklyExpensesTotal}
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-xl border ${
                      remainingWeeklyBudget >= 0
                        ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/30"
                        : "bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-400/30"
                    }`}
                  >
                    <div
                      className={`text-sm font-medium ${
                        remainingWeeklyBudget >= 0
                          ? "text-green-300"
                          : "text-red-300"
                      }`}
                    >
                      {remainingWeeklyBudget >= 0 ? "Remaining" : "Over Budget"}
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        remainingWeeklyBudget >= 0
                          ? "text-green-100"
                          : "text-red-100"
                      }`}
                    >
                      €{Math.abs(remainingWeeklyBudget)}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-700/50 rounded-full h-3 backdrop-blur-sm">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        weeklyExpensesTotal > currentWeeklyBudget
                          ? "bg-gradient-to-r from-red-500 to-red-400"
                          : weeklyExpensesTotal / currentWeeklyBudget > 0.8
                          ? "bg-gradient-to-r from-yellow-500 to-orange-400"
                          : "bg-gradient-to-r from-green-500 to-emerald-400"
                      }`}
                      style={{
                        width: `${Math.min(
                          (weeklyExpensesTotal / currentWeeklyBudget) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>€0</span>
                    <span>€{currentWeeklyBudget}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(currentCategoryLimits || {}).map(
                  ([category, limit]) => {
                    const spent = categorySpending[category] || 0;
                    const percentage = limit > 0 ? (spent / limit) * 100 : 0;
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-white">
                            {category}
                          </span>
                          <span className="text-sm text-gray-300">
                            €{spent} / €{limit}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-3 backdrop-blur-sm">
                          <div
                            className={`h-3 rounded-full transition-all duration-300 ${
                              percentage > 100
                                ? "bg-gradient-to-r from-red-500 to-red-400"
                                : percentage > 80
                                ? "bg-gradient-to-r from-yellow-500 to-orange-400"
                                : "bg-gradient-to-r from-green-500 to-emerald-400"
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Recent Expenses */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Recent Expenses
              </h2>
              <div className="space-y-3">
                {(expenses || []).filter((e) => e?.week === currentWeek)
                  .length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    💸 No expenses for this week. Add your first expense above!
                  </div>
                ) : (
                  (expenses || [])
                    .filter((e) => e?.week === currentWeek)
                    .slice(-10)
                    .reverse()
                    .map((expense) => (
                      <div
                        key={expense?.id}
                        className="flex justify-between items-center p-3 bg-gray-700/30 rounded-xl border border-gray-600/30 backdrop-blur-sm"
                      >
                        <div>
                          <div className="font-medium text-white">
                            {expense?.description || "Unknown"}
                          </div>
                          <div className="text-sm text-gray-400">
                            {expense?.category || "Other"} •{" "}
                            {expense?.date || "Unknown date"}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-cyan-400">
                          €{expense?.amount || 0}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Monthly Tab */}
        {activeTab === "monthly" && (
          <div className="space-y-6">
            {/* Tab Title */}
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Monthly Budget
              </h1>
              <p className="text-gray-400">
                Manage your monthly income and expenses
              </p>
            </div>

            {/* Month Navigation */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(currentMonth - 1)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-4 py-2 rounded-xl transition-all duration-200"
                >
                  ← Previous Month
                </button>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">
                    {getMonthName(currentMonth)}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {currentMonth === 0
                      ? "Current Month"
                      : currentMonth > 0
                      ? `${currentMonth} Month${
                          currentMonth > 1 ? "s" : ""
                        } Ahead`
                      : `${Math.abs(currentMonth)} Month${
                          Math.abs(currentMonth) > 1 ? "s" : ""
                        } Ago`}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentMonth(currentMonth + 1)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-4 py-2 rounded-xl transition-all duration-200"
                >
                  Next Month →
                </button>
              </div>
            </div>

            {/* Add Form Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() =>
                  setShowMonthlyExpenseForm(!showMonthlyExpenseForm)
                }
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg"
              >
                {showMonthlyExpenseForm ? "− Hide" : "+"} Monthly Expense
              </button>
              <button
                onClick={() => setShowMonthlyIncomeForm(!showMonthlyIncomeForm)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg"
              >
                {showMonthlyIncomeForm ? "− Hide" : "+"} Income Source
              </button>
            </div>

            {/* Add New Monthly Expense */}
            {showMonthlyExpenseForm && (
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  📅 Add Monthly Expense
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Expense name (e.g., Rent, Insurance)"
                    value={newMonthlyExpense.name}
                    onChange={(e) =>
                      setNewMonthlyExpense({
                        ...newMonthlyExpense,
                        name: e.target.value,
                      })
                    }
                    className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <input
                    type="number"
                    placeholder="Amount (€)"
                    value={newMonthlyExpense.amount}
                    onChange={(e) =>
                      setNewMonthlyExpense({
                        ...newMonthlyExpense,
                        amount: e.target.value,
                      })
                    }
                    className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="planned"
                      checked={newMonthlyExpense.planned}
                      onChange={(e) =>
                        setNewMonthlyExpense({
                          ...newMonthlyExpense,
                          planned: e.target.checked,
                        })
                      }
                      className="rounded border-cyan-500/30 text-cyan-400 focus:ring-cyan-400/20"
                    />
                    <label htmlFor="planned" className="text-white text-sm">
                      Planned expense
                    </label>
                  </div>
                  <button
                    onClick={addMonthlyExpense}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  >
                    ➕ Add Expense
                  </button>
                </div>
              </div>
            )}

            {/* Add New Monthly Income */}
            {showMonthlyIncomeForm && (
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  💰 Add Income Source
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Income source (e.g., Job, Freelance, Trading)"
                    value={newMonthlyIncome.source}
                    onChange={(e) =>
                      setNewMonthlyIncome({
                        ...newMonthlyIncome,
                        source: e.target.value,
                      })
                    }
                    className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <input
                    type="number"
                    placeholder="Amount (€)"
                    value={newMonthlyIncome.amount}
                    onChange={(e) =>
                      setNewMonthlyIncome({
                        ...newMonthlyIncome,
                        amount: e.target.value,
                      })
                    }
                    className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <button
                    onClick={addMonthlyIncome}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                  >
                    ➕ Add Income
                  </button>
                </div>
              </div>
            )}

            {/* Monthly Budget Overview */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Monthly Budget Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-400/30 backdrop-blur-sm">
                  <div className="text-sm text-green-300 font-medium">
                    Total Income
                  </div>
                  <div className="text-2xl font-bold text-green-100">
                    €{monthlyIncomePaid}
                  </div>
                  <div className="text-xs text-green-400">
                    Received: €{monthlyIncomePaid} / €{monthlyIncomeTotal}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 p-4 rounded-xl border border-red-400/30 backdrop-blur-sm">
                  <div className="text-sm text-red-300 font-medium">
                    Expenses Paid
                  </div>
                  <div className="text-2xl font-bold text-red-100">
                    €{monthlyExpensesTotal}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-4 rounded-xl border border-yellow-400/30 backdrop-blur-sm">
                  <div className="text-sm text-yellow-300 font-medium">
                    Planned Expenses
                  </div>
                  <div className="text-2xl font-bold text-yellow-100">
                    €
                    {(monthlyExpenses || []).reduce(
                      (sum, e) => sum + (parseFloat(e?.amount) || 0),
                      0
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Expenses */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Monthly Expenses
              </h2>
              <div className="space-y-3">
                {(monthlyExpenses || []).length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    📋 No expenses for {getMonthName(currentMonth)}. Add your
                    first expense above!
                  </div>
                ) : (
                  (monthlyExpenses || []).map((expense) => (
                    <div
                      key={expense?.id}
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl border border-gray-600/30 backdrop-blur-sm"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={expense?.paid || false}
                          onChange={(e) =>
                            updateMonthlyExpensePaid(
                              expense?.id,
                              e.target.checked
                            )
                          }
                          className="mr-3 rounded border-cyan-500/30 text-cyan-400 focus:ring-cyan-400/20"
                        />
                        <div>
                          <div
                            className={`font-medium ${
                              expense?.paid
                                ? "line-through text-gray-500"
                                : "text-white"
                            }`}
                          >
                            {expense?.name || "Unknown"}
                          </div>
                          <div className="text-sm text-gray-400">
                            {expense?.planned ? "Planned" : "Unplanned"}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-cyan-400">
                        €{expense?.amount || 0}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Monthly Income Sources */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Income Sources
              </h2>
              <div className="space-y-3">
                {(monthlyIncome || []).length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    💰 No income sources for {getMonthName(currentMonth)}. Add
                    your first income source above!
                  </div>
                ) : (
                  (monthlyIncome || []).map((income) => (
                    <div
                      key={income?.id}
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl border border-gray-600/30 backdrop-blur-sm"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={income?.received || false}
                          onChange={(e) =>
                            updateMonthlyIncomeReceived(
                              income?.id,
                              e.target.checked
                            )
                          }
                          className="mr-3 rounded border-cyan-500/30 text-cyan-400 focus:ring-cyan-400/20"
                        />
                        <div>
                          <div
                            className={`font-medium ${
                              income?.received ? "text-green-400" : "text-white"
                            }`}
                          >
                            {income?.source || "Unknown"}
                          </div>
                          <div className="text-sm text-gray-400">
                            {income?.received ? "Received" : "Pending"}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-green-400">
                        €{income?.amount || 0}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {/* Tab Title */}
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Projects
              </h1>
              <p className="text-gray-400">
                Manage your projects and track progress
              </p>
            </div>

            {/* Add New Project Button */}
            <div className="text-center">
              <button
                onClick={() => setShowProjectForm(!showProjectForm)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-medium px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 text-lg"
              >
                {showProjectForm ? "− Hide Form" : "+ Add New Project"}
              </button>
            </div>

            {/* Add New Project Form */}
            {showProjectForm && (
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  🚀 Add New Project
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Project name"
                      value={newProject.name}
                      onChange={(e) =>
                        setNewProject({ ...newProject, name: e.target.value })
                      }
                      className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <select
                      value={newProject.status}
                      onChange={(e) =>
                        setNewProject({ ...newProject, status: e.target.value })
                      }
                      className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    >
                      <option value="Planning">📋 Planning</option>
                      <option value="In Progress">🚀 In Progress</option>
                      <option value="Completed">✅ Completed</option>
                      <option value="On Hold">⏸️ On Hold</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="number"
                      placeholder="Budget (€)"
                      value={newProject.budget_allocated}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          budget_allocated: e.target.value,
                        })
                      }
                      className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <input
                      type="number"
                      placeholder="Time (hours)"
                      value={newProject.time_allocated_hours}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          time_allocated_hours: e.target.value,
                        })
                      }
                      className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <select
                      value={newProject.priority}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          priority: e.target.value,
                        })
                      }
                      className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    >
                      <option value="Low">🔵 Low Priority</option>
                      <option value="Medium">🟡 Medium Priority</option>
                      <option value="High">🔴 High Priority</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={newProject.start_date}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          start_date: e.target.value,
                        })
                      }
                      className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <input
                      type="date"
                      value={newProject.due_date}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          due_date: e.target.value,
                        })
                      }
                      className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Tasks:
                    </label>
                    {(newProject.tasks || []).map((task, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder={`Task ${index + 1}`}
                          value={task}
                          onChange={(e) =>
                            updateTaskInNewProject(index, e.target.value)
                          }
                          className="flex-1 bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                        />
                        {newProject.tasks.length > 1 && (
                          <button
                            onClick={() => removeTaskFromNewProject(index)}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-xl transition-all duration-200"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addTaskToNewProject}
                      className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-cyan-400 px-4 py-2 rounded-xl transition-all duration-200 border border-cyan-500/30"
                    >
                      + Add Task
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={addProject}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                    >
                      🚀 Create Project
                    </button>
                    <button
                      onClick={() => setShowProjectForm(false)}
                      className="bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 px-6 py-3 rounded-xl transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Projects List */}
            <div className="space-y-6">
              {Object.entries(projects || {}).map(([projectName, project]) => (
                <div
                  key={projectName}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {projectName}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project?.status === "In Progress"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                              : project?.status === "Completed"
                              ? "bg-green-500/20 text-green-300 border border-green-400/30"
                              : project?.status === "On Hold"
                              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                              : "bg-gray-500/20 text-gray-300 border border-gray-400/30"
                          }`}
                        >
                          {project?.status || "Unknown"}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project?.priority === "High"
                              ? "bg-red-500/20 text-red-300 border border-red-400/30"
                              : project?.priority === "Medium"
                              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                          }`}
                        >
                          {project?.priority || "Medium"} Priority
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">
                        {getProjectCompletion(project)}%
                      </div>
                      <div className="text-sm text-gray-400">Complete</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700/50 rounded-full h-3 mb-4 backdrop-blur-sm">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${getProjectCompletion(project)}%` }}
                    ></div>
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-xl border border-blue-400/30">
                      <div className="text-xs text-blue-300">Budget</div>
                      <div className="flex items-center justify-between">
                        {editingProject.projectName === projectName &&
                        editingProject.field === "budget" ? (
                          <input
                            type="number"
                            value={editingProject.value}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                value: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateProjectBudget(
                                  projectName,
                                  editingProject.value
                                );
                                setEditingProject({
                                  projectName: null,
                                  field: null,
                                  value: "",
                                });
                              }
                              if (e.key === "Escape") {
                                setEditingProject({
                                  projectName: null,
                                  field: null,
                                  value: "",
                                });
                              }
                            }}
                            onBlur={() => {
                              updateProjectBudget(
                                projectName,
                                editingProject.value
                              );
                              setEditingProject({
                                projectName: null,
                                field: null,
                                value: "",
                              });
                            }}
                            className="w-20 bg-gray-600/50 border border-cyan-500/30 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-400"
                            autoFocus
                          />
                        ) : (
                          <div className="text-sm font-bold text-blue-100">
                            €{project?.money_spent || 0} / €
                            {project?.budget_allocated || 0}
                          </div>
                        )}
                        <button
                          onClick={() =>
                            setEditingProject({
                              projectName,
                              field: "budget",
                              value: project?.budget_allocated || 0,
                            })
                          }
                          className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-2 py-1 rounded text-xs transition-all duration-200"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 rounded-xl border border-green-400/30">
                      <div className="text-xs text-green-300">Time</div>
                      <div className="flex items-center justify-between">
                        {editingProject.projectName === projectName &&
                        editingProject.field === "time" ? (
                          <input
                            type="number"
                            value={editingProject.value}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                value: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateProjectTime(
                                  projectName,
                                  editingProject.value
                                );
                                setEditingProject({
                                  projectName: null,
                                  field: null,
                                  value: "",
                                });
                              }
                              if (e.key === "Escape") {
                                setEditingProject({
                                  projectName: null,
                                  field: null,
                                  value: "",
                                });
                              }
                            }}
                            onBlur={() => {
                              updateProjectTime(
                                projectName,
                                editingProject.value
                              );
                              setEditingProject({
                                projectName: null,
                                field: null,
                                value: "",
                              });
                            }}
                            className="w-16 bg-gray-600/50 border border-cyan-500/30 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-400"
                            autoFocus
                          />
                        ) : (
                          <div className="text-sm font-bold text-green-100">
                            {project?.time_logged || 0}h /{" "}
                            {project?.time_allocated_hours || 0}h
                          </div>
                        )}
                        <button
                          onClick={() =>
                            setEditingProject({
                              projectName,
                              field: "time",
                              value: project?.time_allocated_hours || 0,
                            })
                          }
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-2 py-1 rounded text-xs transition-all duration-200"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-xl border border-purple-400/30">
                      <div className="text-xs text-purple-300">Start Date</div>
                      <div className="text-sm font-bold text-purple-100">
                        {project?.start_date || "Not set"}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-3 rounded-xl border border-orange-400/30">
                      <div className="text-xs text-orange-300">Due Date</div>
                      <div className="text-sm font-bold text-orange-100">
                        {project?.due_date || "Not set"}
                      </div>
                    </div>
                  </div>

                  {/* Log Work Section */}
                  <div className="mb-4 bg-gradient-to-br from-gray-700/30 to-gray-800/30 p-4 rounded-xl border border-gray-600/30">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Log Work
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="number"
                        placeholder="Money spent (€)"
                        value={
                          loggingWork.projectName === projectName
                            ? loggingWork.money
                            : ""
                        }
                        onChange={(e) =>
                          setLoggingWork({
                            projectName,
                            money: e.target.value,
                            time:
                              loggingWork.projectName === projectName
                                ? loggingWork.time
                                : "",
                          })
                        }
                        className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm"
                      />
                      <input
                        type="number"
                        step="0.5"
                        placeholder="Time spent (hours)"
                        value={
                          loggingWork.projectName === projectName
                            ? loggingWork.time
                            : ""
                        }
                        onChange={(e) =>
                          setLoggingWork({
                            projectName,
                            money:
                              loggingWork.projectName === projectName
                                ? loggingWork.money
                                : "",
                            time: e.target.value,
                          })
                        }
                        className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm"
                      />
                      <button
                        onClick={() => {
                          if (loggingWork.money) {
                            logProjectMoney(projectName, loggingWork.money);
                          }
                          if (loggingWork.time) {
                            logProjectTime(projectName, loggingWork.time);
                          }
                          setLoggingWork({
                            projectName: null,
                            money: "",
                            time: "",
                          });
                        }}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white px-4 py-2 rounded-xl transition-all duration-200 text-sm"
                      >
                        Log Work
                      </button>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Tasks
                    </h4>
                    <div className="space-y-2">
                      {(project?.tasks || []).map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="flex items-center justify-between p-3 bg-gray-700/30 rounded-xl border border-gray-600/30"
                        >
                          <div className="flex items-center flex-1">
                            <input
                              type="checkbox"
                              checked={task?.done || false}
                              onChange={(e) =>
                                updateProjectTask(
                                  projectName,
                                  taskIndex,
                                  e.target.checked
                                )
                              }
                              className="mr-3 rounded border-cyan-500/30 text-cyan-400 focus:ring-cyan-400/20"
                            />
                            {editingTask.projectName === projectName &&
                            editingTask.taskIndex === taskIndex ? (
                              <input
                                type="text"
                                value={editingTask.text}
                                onChange={(e) =>
                                  setEditingTask({
                                    ...editingTask,
                                    text: e.target.value,
                                  })
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    updateProjectTaskText(
                                      projectName,
                                      taskIndex,
                                      editingTask.text
                                    );
                                    setEditingTask({
                                      projectName: null,
                                      taskIndex: null,
                                      text: "",
                                    });
                                  }
                                  if (e.key === "Escape") {
                                    setEditingTask({
                                      projectName: null,
                                      taskIndex: null,
                                      text: "",
                                    });
                                  }
                                }}
                                onBlur={() => {
                                  updateProjectTaskText(
                                    projectName,
                                    taskIndex,
                                    editingTask.text
                                  );
                                  setEditingTask({
                                    projectName: null,
                                    taskIndex: null,
                                    text: "",
                                  });
                                }}
                                className="flex-1 bg-gray-600/50 border border-cyan-500/30 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-cyan-400"
                                autoFocus
                              />
                            ) : (
                              <span
                                className={`flex-1 ${
                                  task?.done
                                    ? "line-through text-gray-500"
                                    : "text-white"
                                }`}
                              >
                                {task?.step || "Unknown task"}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ml-3">
                            <button
                              onClick={() =>
                                setEditingTask({
                                  projectName,
                                  taskIndex,
                                  text: task?.step || "",
                                })
                              }
                              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-2 py-1 rounded-lg transition-all duration-200 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                deleteProjectTask(projectName, taskIndex)
                              }
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-2 py-1 rounded-lg transition-all duration-200 text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add New Task */}
                    <div className="mt-3">
                      <button
                        onClick={() => {
                          const taskText = prompt("Enter new task:");
                          if (taskText) {
                            addTaskToProject(projectName, taskText);
                          }
                        }}
                        className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-400 px-4 py-2 rounded-xl transition-all duration-200 border border-green-500/30 text-sm"
                      >
                        + Add Task
                      </button>
                    </div>
                  </div>

                  {/* Notes */}
                  {project?.notes && project.notes.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Notes
                      </h4>
                      <div className="space-y-3">
                        {project.notes.map((note, noteIndex) => (
                          <div
                            key={noteIndex}
                            className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30"
                          >
                            <h5 className="font-medium text-cyan-400 mb-2">
                              {note?.title || "Untitled Note"}
                            </h5>
                            {Array.isArray(note?.content) ? (
                              <div className="space-y-1">
                                {note.content.map((line, lineIndex) => (
                                  <div
                                    key={lineIndex}
                                    className="text-sm text-gray-300"
                                  >
                                    {line}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-sm text-gray-300">
                                {note?.content || "No content"}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {Object.keys(projects || {}).length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold mb-2">
                    No projects yet
                  </h3>
                  <p>
                    Create your first project to start tracking your progress!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            {/* Tab Title */}
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Schedule
              </h1>
              <p className="text-gray-400">
                Manage your work sessions and appointments
              </p>
            </div>

            {/* Add New Work Session Button */}
            <div className="text-center">
              <button
                onClick={() => setShowWorkSessionForm(!showWorkSessionForm)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-medium px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-orange-500/25 text-lg"
              >
                {showWorkSessionForm ? "− Hide Form" : "+ Schedule Session"}
              </button>
            </div>

            {/* Add New Work Session Form */}
            {showWorkSessionForm && (
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  📅 Schedule Work Session
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Session title (e.g., Bitcoin Analysis)"
                    value={newWorkSession.title}
                    onChange={(e) =>
                      setNewWorkSession({
                        ...newWorkSession,
                        title: e.target.value,
                      })
                    }
                    className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <input
                    type="date"
                    value={newWorkSession.date}
                    onChange={(e) =>
                      setNewWorkSession({
                        ...newWorkSession,
                        date: e.target.value,
                      })
                    }
                    className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <input
                    type="time"
                    value={newWorkSession.time}
                    onChange={(e) =>
                      setNewWorkSession({
                        ...newWorkSession,
                        time: e.target.value,
                      })
                    }
                    className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <input
                    type="number"
                    placeholder="Duration (minutes)"
                    value={newWorkSession.duration}
                    onChange={(e) =>
                      setNewWorkSession({
                        ...newWorkSession,
                        duration: e.target.value,
                      })
                    }
                    className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={addWorkSession}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                  >
                    📅 Schedule Session
                  </button>
                  <button
                    onClick={() => setShowWorkSessionForm(false)}
                    className="bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 px-6 py-3 rounded-xl transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Today's Schedule */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Today's Schedule
              </h2>
              <div className="space-y-3">
                {(workSessions || [])
                  .filter(
                    (session) =>
                      session?.date === new Date().toISOString().split("T")[0]
                  )
                  .sort((a, b) => (a?.time || "").localeCompare(b?.time || ""))
                  .map((session) => (
                    <div
                      key={session?.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-400/30 backdrop-blur-sm"
                    >
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 mr-4"></div>
                        <div>
                          <div className="font-medium text-white">
                            {session?.title || "Untitled Session"}
                          </div>
                          <div className="text-sm text-gray-400">
                            {session?.time || "No time"} •{" "}
                            {session?.duration || 60} minutes
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            session?.status === "completed"
                              ? "bg-green-500/20 text-green-300 border border-green-400/30"
                              : session?.status === "in-progress"
                              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                          }`}
                        >
                          {session?.status === "completed"
                            ? "✅ Completed"
                            : session?.status === "in-progress"
                            ? "🔄 In Progress"
                            : "📅 Scheduled"}
                        </span>
                        <button
                          onClick={() => {
                            const updated = workSessions.map((s) =>
                              s?.id === session?.id
                                ? {
                                    ...s,
                                    status:
                                      s?.status === "completed"
                                        ? "scheduled"
                                        : "completed",
                                  }
                                : s
                            );
                            setWorkSessions(updated);
                          }}
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1 rounded-lg transition-all duration-200"
                        >
                          {session?.status === "completed"
                            ? "Undo"
                            : "Complete"}
                        </button>
                      </div>
                    </div>
                  ))}
                {(workSessions || []).filter(
                  (session) =>
                    session?.date === new Date().toISOString().split("T")[0]
                ).length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    📅 No sessions scheduled for today. Add one above!
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Upcoming Sessions
              </h2>
              <div className="space-y-3">
                {(workSessions || [])
                  .filter(
                    (session) =>
                      session?.date > new Date().toISOString().split("T")[0]
                  )
                  .sort((a, b) => {
                    const dateA = new Date(a?.date + " " + a?.time);
                    const dateB = new Date(b?.date + " " + b?.time);
                    return dateA - dateB;
                  })
                  .slice(0, 10)
                  .map((session) => (
                    <div
                      key={session?.id}
                      className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 backdrop-blur-sm"
                    >
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mr-4"></div>
                        <div>
                          <div className="font-medium text-white">
                            {session?.title || "Untitled Session"}
                          </div>
                          <div className="text-sm text-gray-400">
                            {new Date(session?.date || "").toLocaleDateString()}{" "}
                            • {session?.time || "No time"} •{" "}
                            {session?.duration || 60} minutes
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-400/30">
                          📅 Scheduled
                        </span>
                        <button
                          onClick={() => {
                            const updated = workSessions.filter(
                              (s) => s?.id !== session?.id
                            );
                            setWorkSessions(updated);
                          }}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded-lg transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                {(workSessions || []).filter(
                  (session) =>
                    session?.date > new Date().toISOString().split("T")[0]
                ).length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    🗓️ No upcoming sessions. Schedule one above!
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-xl border border-blue-400/30">
                <div className="text-sm text-blue-300 font-medium">
                  Today's Sessions
                </div>
                <div className="text-2xl font-bold text-blue-100">
                  {
                    (workSessions || []).filter(
                      (s) => s?.date === new Date().toISOString().split("T")[0]
                    ).length
                  }
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-xl border border-green-400/30">
                <div className="text-sm text-green-300 font-medium">
                  Completed Today
                </div>
                <div className="text-2xl font-bold text-green-100">
                  {
                    (workSessions || []).filter(
                      (s) =>
                        s?.date === new Date().toISOString().split("T")[0] &&
                        s?.status === "completed"
                    ).length
                  }
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-400/30">
                <div className="text-sm text-purple-300 font-medium">
                  Total Upcoming
                </div>
                <div className="text-2xl font-bold text-purple-100">
                  {
                    (workSessions || []).filter(
                      (s) => s?.date > new Date().toISOString().split("T")[0]
                    ).length
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === "notes" && (
          <div className="space-y-6">
            {/* Tab Title */}
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Notes
              </h1>
              <p className="text-gray-400">
                Capture your ideas and important information
              </p>
            </div>

            {/* Add New Note Button */}
            <div className="text-center">
              <button
                onClick={() => setShowNoteForm(!showNoteForm)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-medium px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/25 text-lg"
              >
                {showNoteForm ? "− Hide Form" : "+ Add New Note"}
              </button>
            </div>

            {/* Add New Note Form */}
            {showNoteForm && (
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  📝 Add New Note
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote({ ...newNote, title: e.target.value })
                    }
                    className="w-full bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={newNote.category}
                      onChange={(e) =>
                        setNewNote({ ...newNote, category: e.target.value })
                      }
                      className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    >
                      <option value="Ideas">💡 Ideas</option>
                      <option value="Research">🔍 Research</option>
                      <option value="Meeting">🤝 Meeting Notes</option>
                      <option value="Personal">👤 Personal</option>
                      <option value="Work">💼 Work</option>
                      <option value="Other">📋 Other</option>
                    </select>

                    <select
                      value={newNote.priority}
                      onChange={(e) =>
                        setNewNote({ ...newNote, priority: e.target.value })
                      }
                      className="bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    >
                      <option value="Low">🔵 Low Priority</option>
                      <option value="Medium">🟡 Medium Priority</option>
                      <option value="High">🔴 High Priority</option>
                    </select>
                  </div>

                  <textarea
                    placeholder="Write your note content here..."
                    value={newNote.content}
                    onChange={(e) =>
                      setNewNote({ ...newNote, content: e.target.value })
                    }
                    rows={6}
                    className="w-full bg-gray-700/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                  />

                  <div className="flex gap-4">
                    <button
                      onClick={addNote}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/25"
                    >
                      📝 Save Note
                    </button>
                    <button
                      onClick={() => setShowNoteForm(false)}
                      className="bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 px-6 py-3 rounded-xl transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notes List */}
            <div className="space-y-4">
              {(notes || []).length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2">No notes yet</h3>
                  <p>Create your first note to start capturing your ideas!</p>
                </div>
              ) : (
                (notes || []).map((note) => (
                  <div
                    key={note?.id}
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {note?.title || "Untitled Note"}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              note?.category === "Ideas"
                                ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                                : note?.category === "Research"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                                : note?.category === "Meeting"
                                ? "bg-green-500/20 text-green-300 border border-green-400/30"
                                : note?.category === "Personal"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-400/30"
                                : note?.category === "Work"
                                ? "bg-orange-500/20 text-orange-300 border border-orange-400/30"
                                : "bg-gray-500/20 text-gray-300 border border-gray-400/30"
                            }`}
                          >
                            {note?.category === "Ideas"
                              ? "💡"
                              : note?.category === "Research"
                              ? "🔍"
                              : note?.category === "Meeting"
                              ? "🤝"
                              : note?.category === "Personal"
                              ? "👤"
                              : note?.category === "Work"
                              ? "💼"
                              : "📋"}{" "}
                            {note?.category || "Other"}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              note?.priority === "High"
                                ? "bg-red-500/20 text-red-300 border border-red-400/30"
                                : note?.priority === "Medium"
                                ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                                : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                            }`}
                          >
                            {note?.priority === "High"
                              ? "🔴"
                              : note?.priority === "Medium"
                              ? "🟡"
                              : "🔵"}{" "}
                            {note?.priority || "Low"} Priority
                          </span>

                          <span className="text-xs text-gray-400">
                            Created: {note?.created || "Unknown"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() =>
                            setExpandedNotes((prev) => ({
                              ...prev,
                              [note?.id]: !prev[note?.id],
                            }))
                          }
                          className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          {expandedNotes[note?.id]
                            ? "📖 Collapse"
                            : "👁️ Expand"}
                        </button>
                        <button
                          onClick={() => deleteNote(note?.id)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-lg transition-all duration-200"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>

                    {/* Note Content */}
                    <div
                      className={`${
                        expandedNotes[note?.id] ? "" : "line-clamp-3"
                      } transition-all duration-200`}
                    >
                      <div className="text-gray-300 whitespace-pre-wrap">
                        {expandedNotes[note?.id]
                          ? note?.content || "No content"
                          : (note?.content || "No content").length > 150
                          ? (note?.content || "No content").substring(0, 150) +
                            "..."
                          : note?.content || "No content"}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Notes Summary */}
            {(notes || []).length > 0 && (
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Notes Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-xl border border-blue-400/30">
                    <div className="text-sm text-blue-300 font-medium">
                      Total Notes
                    </div>
                    <div className="text-2xl font-bold text-blue-100">
                      {(notes || []).length}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 p-4 rounded-xl border border-red-400/30">
                    <div className="text-sm text-red-300 font-medium">
                      High Priority
                    </div>
                    <div className="text-2xl font-bold text-red-100">
                      {
                        (notes || []).filter((n) => n?.priority === "High")
                          .length
                      }
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-4 rounded-xl border border-yellow-400/30">
                    <div className="text-sm text-yellow-300 font-medium">
                      Ideas
                    </div>
                    <div className="text-2xl font-bold text-yellow-100">
                      {
                        (notes || []).filter((n) => n?.category === "Ideas")
                          .length
                      }
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-400/30">
                    <div className="text-sm text-green-300 font-medium">
                      Research
                    </div>
                    <div className="text-2xl font-bold text-green-100">
                      {
                        (notes || []).filter((n) => n?.category === "Research")
                          .length
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPersonalAssistant;

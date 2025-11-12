export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export const Questions: Record<string, Question[]> = {
  "Java": [
    { question: "What is JVM?", options: ["Java Virtual Machine", "Java Visual Machine", "Java Variable Method", "Just Virtual Machine"], answer: "Java Virtual Machine" },
    { question: "Which keyword is used to define a class?", options: ["class", "define", "object", "struct"], answer: "class" },
    { question: "Java is a ___ language?", options: ["Object Oriented", "Functional", "Procedural", "Scripting"], answer: "Object Oriented" },
    { question: "Default value of int in Java?", options: ["0", "null", "1", "-1"], answer: "0" },
    { question: "Which package contains the Scanner class?", options: ["java.util", "java.io", "java.lang", "java.net"], answer: "java.util" },
    { question: "Which keyword is used for inheritance?", options: ["extends", "implements", "inherits", "super"], answer: "extends" },
    { question: "Which method is the entry point of a Java program?", options: ["main()", "start()", "run()", "init()"], answer: "main()" },
    { question: "Which of these is a Java access modifier?", options: ["public", "open", "visible", "internal"], answer: "public" },
    { question: "Which exception is thrown when dividing by zero?", options: ["ArithmeticException", "NullPointerException", "IOException", "ArrayIndexOutOfBoundsException"], answer: "ArithmeticException" },
    { question: "What does JDK stand for?", options: ["Java Development Kit", "Java Deployment Kit", "Java Debug Kit", "Java Design Kit"], answer: "Java Development Kit" },
  ],

  "App Development": [
    { question: "Which language is used for Android development?", options: ["Java", "Python", "C#", "Kotlin"], answer: "Java" },
    { question: "What is APK?", options: ["Android Package Kit", "Application Package Key", "Android Program Kit", "App Package Key"], answer: "Android Package Kit" },
    { question: "Which layout arranges elements vertically?", options: ["LinearLayout", "RelativeLayout", "FrameLayout", "ConstraintLayout"], answer: "LinearLayout" },
    { question: "Which file contains app resources?", options: ["res", "src", "lib", "assets"], answer: "res" },
    { question: "Which file is the main entry point of an Android app?", options: ["MainActivity.java", "App.java", "AndroidManifest.xml", "Main.xml"], answer: "MainActivity.java" },
    { question: "Which method is called when an activity is created?", options: ["onCreate()", "onStart()", "onResume()", "main()"], answer: "onCreate()" },
    { question: "Which language is official for modern Android development?", options: ["Kotlin", "Java", "Python", "C++"], answer: "Kotlin" },
    { question: "What is the extension of Android app package?", options: [".apk", ".jar", ".exe", ".app"], answer: ".apk" },
    { question: "Which widget is used for text input?", options: ["EditText", "TextView", "Button", "RadioButton"], answer: "EditText" },
    { question: "Which file defines permissions in Android?", options: ["AndroidManifest.xml", "build.gradle", "MainActivity.java", "res/values/strings.xml"], answer: "AndroidManifest.xml" },
  ],

  "Blockchain": [
    { question: "What is Blockchain?", options: ["Distributed ledger", "Database", "Cloud", "Server"], answer: "Distributed ledger" },
    { question: "Who created Bitcoin?", options: ["Satoshi Nakamoto", "Vitalik Buterin", "Elon Musk", "Bill Gates"], answer: "Satoshi Nakamoto" },
    { question: "Which consensus algorithm does Bitcoin use?", options: ["Proof of Work", "Proof of Stake", "Delegated Proof of Stake", "PBFT"], answer: "Proof of Work" },
    { question: "A blockchain is composed of ___", options: ["Blocks", "Files", "Servers", "Nodes"], answer: "Blocks" },
    { question: "What is a smart contract?", options: ["Self-executing contract", "Legal contract", "Manual transaction", "Bank contract"], answer: "Self-executing contract" },
    { question: "Which platform is famous for smart contracts?", options: ["Ethereum", "Bitcoin", "Ripple", "Litecoin"], answer: "Ethereum" },
    { question: "What is a node in blockchain?", options: ["Network participant", "Block", "Transaction", "Ledger"], answer: "Network participant" },
    { question: "What is immutability in blockchain?", options: ["Cannot be changed", "Easily modified", "Deleted", "Encrypted"], answer: "Cannot be changed" },
    { question: "Which term defines blockchain currency?", options: ["Cryptocurrency", "Digital token", "Coin", "All"], answer: "Cryptocurrency" },
    { question: "Which blockchain type is public and decentralized?", options: ["Public blockchain", "Private blockchain", "Consortium blockchain", "Centralized ledger"], answer: "Public blockchain" },
  ],

  "Web Development": [
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Markup Language", "Hyperlink Text Markup Language", "Hyper Tool Markup Language"], answer: "HyperText Markup Language" },
    { question: "Which CSS property changes text color?", options: ["color", "font-color", "text-color", "background-color"], answer: "color" },
    { question: "Which JavaScript keyword declares a variable?", options: ["let", "var", "const", "All of these"], answer: "All of these" },
    { question: "Which tag is used for hyperlinks in HTML?", options: ["<a>", "<link>", "<href>", "<hyper>"], answer: "<a>" },
    { question: "Which HTTP method retrieves data?", options: ["GET", "POST", "PUT", "DELETE"], answer: "GET" },
    { question: "Which CSS property is used for layout spacing?", options: ["margin", "padding", "border", "gap"], answer: "margin" },
    { question: "Which framework is React based on?", options: ["JavaScript", "Python", "Java", "C#"], answer: "JavaScript" },
    { question: "Which HTML element contains page metadata?", options: ["<head>", "<body>", "<title>", "<footer>"], answer: "<head>" },
    { question: "Which tag is used for images in HTML?", options: ["<img>", "<image>", "<src>", "<picture>"], answer: "<img>" },
    { question: "Which protocol is used for secure communication?", options: ["HTTPS", "HTTP", "FTP", "SMTP"], answer: "HTTPS" },
  ],

  "Python": [
    { question: "Which keyword defines a function in Python?", options: ["def", "func", "function", "lambda"], answer: "def" },
    { question: "Which data type is mutable?", options: ["list", "tuple", "string", "int"], answer: "list" },
    { question: "Which operator is used for exponentiation?", options: ["**", "^", "*", "%"], answer: "**" },
    { question: "What does `len()` do?", options: ["Returns length", "Prints value", "Deletes value", "Converts type"], answer: "Returns length" },
    { question: "Which keyword is used for loops?", options: ["for", "while", "Both", "loop"], answer: "Both" },
    { question: "Which symbol is used for comments?", options: ["#", "//", "/* */", "<!-- -->"], answer: "#" },
    { question: "What does `import` do?", options: ["Imports module", "Declares variable", "Executes code", "None"], answer: "Imports module" },
    { question: "Which function reads user input?", options: ["input()", "read()", "scan()", "get()"], answer: "input()" },
    { question: "Which method adds an element to a list?", options: ["append()", "add()", "insert()", "push()"], answer: "append()" },
    { question: "Which module is used for random numbers?", options: ["random", "math", "os", "sys"], answer: "random" },
  ],

  "C & C++": [
    { question: "Which symbol ends a statement in C/C++?", options: [";", ".", ",", ":"], answer: ";" },
    { question: "Which function is the entry point of a C/C++ program?", options: ["main()", "start()", "init()", "run()"], answer: "main()" },
    { question: "Which keyword defines a constant?", options: ["const", "final", "define", "immutable"], answer: "const" },
    { question: "Which operator is for logical AND?", options: ["&&", "&", "||", "|"], answer: "&&" },
    { question: "Which header file is needed for printf?", options: ["stdio.h", "stdlib.h", "string.h", "conio.h"], answer: "stdio.h" },
    { question: "Which keyword declares a class in C++?", options: ["class", "struct", "object", "define"], answer: "class" },
    { question: "Which operator is used for pointer dereference?", options: ["*", "&", "%", "#"], answer: "*" },
    { question: "Which loop executes at least once?", options: ["do-while", "for", "while", "foreach"], answer: "do-while" },
    { question: "Which keyword allows function overloading?", options: ["C++ supports it", "C supports it", "Both", "None"], answer: "C++ supports it" },
    { question: "Which operator is used for addition assignment?", options: ["+=", "++", "=", "-="], answer: "+=" },
  ],

  "Data Analysis": [
    { question: "Which library is used for data analysis in Python?", options: ["Pandas", "NumPy", "Matplotlib", "Seaborn"], answer: "Pandas" },
    { question: "Which structure represents tabular data?", options: ["DataFrame", "Array", "Matrix", "List"], answer: "DataFrame" },
    { question: "Which function reads CSV files?", options: ["read_csv()", "read_excel()", "read_table()", "load_csv()"], answer: "read_csv()" },
    { question: "Which method gives summary statistics?", options: ["describe()", "summary()", "info()", "stats()"], answer: "describe()" },
    { question: "Which library is used for plotting?", options: ["Matplotlib", "Pandas", "NumPy", "Scikit-learn"], answer: "Matplotlib" },
    { question: "Which method selects a column in DataFrame?", options: ["df['col']", "df.col", "df.select()", "df.get()"], answer: "df['col']" },
    { question: "Which function returns number of rows and columns?", options: ["shape", "size", "length", "count"], answer: "shape" },
    { question: "Which library is used for numerical operations?", options: ["NumPy", "Pandas", "Seaborn", "Matplotlib"], answer: "NumPy" },
    { question: "Which method removes missing values?", options: ["dropna()", "fillna()", "remove()", "delete()"], answer: "dropna()" },
    { question: "Which method merges DataFrames?", options: ["merge()", "concat()", "join()", "All"], answer: "All" },
  ],
};

export const sidebarLinks = [
    // {
    //     imgURL: "/assets/home.svg",
    //     route: "/",
    //     label: "Home",
    // },
    // {
    //     imgURL: "/assets/events.svg",
    //     route: "/tests",
    //     label: "Tests",
    // },
    {
        imgURL:"/assets/book.svg",
        route: "/courses",
        label: "Courses",
    },
    {
        imgURL: "/assets/community.svg",
        route: "/classes",
        label: "Classes",
    },
    {
        imgURL: "/assets/face.svg",
        route: "/learn",
        label: "Learn AI",
    },
    // {
    //     imgURL: "/assets/create.svg",
    //     route: "/create",
    //     label: "Create",
    // },
    // {
    //     imgURL: "/assets/inbox.svg",
    //     route: "/inbox",
    //     label: "Inbox",
    // },


];




// featuresConstants.js

export const features = [
    {
        title: "Face Search",
        description: "Easily find your friends and yourself in event photos. Experience our advanced facial recognition technology that redefines the way you revisit and enjoy memories.",
        icon: "/assets/face.svg",
    },
    {
        title: "Dynamic Communities",
        description: "Engage with communities that matter to you. Join or create groups that reflect your interests, and stay connected with significant and meaningful networks.",
        icon: "/assets/community.svg",
    },
    {
        title: "Event Discovery",
        description: "Explore community events that cater to your preferences. Participate and share in the joy of collective memories that bring members together.",
        icon: "/assets/events.svg",
    },
    {
        title: "Crowd Snap",
        description: "Enhance your community's narrative by sharing photos with ease. Revisit and cherish the pinnacle moments of your community's story.",
        icon: "/assets/photo.svg",
    }
];


//assistant types
export const assistantTypes = [
  "teaching-assistant",
  "learning-assistant",
]


//Models

export const models = [
    {
      organization: "open-ai",
      modelName: "gpt-4-turbo",
      modelString: "gpt-4-turbo",
      contextLength:128000
    },
    {
      organization: "open-ai",
      modelName: "gpt-3.5-turbo-0125",
      modelString: "gpt-3.5-turbo-0125",
      contextLength:16385
    },
    {
      organization: "cognitivecomputations",
      modelName: "Dolphin 2.5 Mixtral 8x7b",
      modelString: "cognitivecomputations/dolphin-2.5-mixtral-8x7b",
      contextLength: 32768
    },
    {
      organization: "databricks",
      modelName: "DBRX Instruct",
      modelString: "databricks/dbrx-instruct",
      contextLength: 32768
    },
    {
      organization: "DeepSeek",
      modelName: "Deepseek Coder Instruct (33B)",
      modelString: "deepseek-ai/deepseek-coder-33b-instruct",
      contextLength: 16384
    },
    {
      organization: "Google",
      modelName: "Gemma Instruct (2B)",
      modelString: "google/gemma-2b-it",
      contextLength: 8192
    },
    {
      organization: "Google",
      modelName: "Gemma Instruct (7B)",
      modelString: "google/gemma-7b-it",
      contextLength: 8192
    },
    
    {
      organization: "Meta",
      modelName: "LLaMA-3 Chat (8B)",
      modelString: "meta-llama/Llama-3-8b-chat-hf",
      contextLength: 8000
    },
    {
      organization: "Meta",
      modelName: "LLaMA-3 Chat (70B)",
      modelString: "meta-llama/Llama-3-70b-chat-hf",
      contextLength: 8000
    },
    {
      organization: "mistralai",
      modelName: "Mistral (7B) Instruct",
      modelString: "mistralai/Mistral-7B-Instruct-v0.1",
      contextLength: 8192
    },
    {
      organization: "mistralai",
      modelName: "Mistral (7B) Instruct v0.2",
      modelString: "mistralai/Mistral-7B-Instruct-v0.2",
      contextLength: 32768
    },
    {
      organization: "mistralai",
      modelName: "Mixtral-8x7B Instruct (46.7B)",
      modelString: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      contextLength: 32768
    },
    {
      organization: "mistralai",
      modelName: "Mixtral-8x22B Instruct (141B)",
      modelString: "mistralai/Mixtral-8x22B-Instruct-v0.1",
      contextLength: 65536
    },
    {
      organization: "NousResearch",
      modelName: "Nous Capybara v1.9 (7B)",
      modelString: "NousResearch/Nous-Capybara-7B-V1p9",
      contextLength: 8192
    },
    {
      organization: "NousResearch",
      modelName: "Nous Hermes 2 - Mistral DPO (7B)",
      modelString: "NousResearch/Nous-Hermes-2-Mistral-7B-DPO",
      contextLength: 32768
    },
    {
      organization: "NousResearch",
      modelName: "Nous Hermes 2 - Mixtral 8x7B-DPO (46.7B)",
      modelString: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
      contextLength: 32768
    },
    {
      organization: "NousResearch",
      modelName: "Nous Hermes 2 - Mixtral 8x7B-SFT (46.7B)",
      modelString: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-SFT",
      contextLength: 32768
    },
   
    {
      organization: "OpenChat",
      modelName: "OpenChat 3.5 (7B)",
      modelString: "openchat/openchat-3.5-1210",
      contextLength: 8192
    },
    {
      organization: "OpenOrca",
      modelName: "OpenOrca Mistral (7B) 8K",
      modelString: "Open-Orca/Mistral-7B-OpenOrca",
      contextLength: 8192
    },
    {
      organization: "Qwen",
      modelName: "Qwen 1.5 Chat (0.5B)",
      modelString: "Qwen/Qwen1.5-0.5B-Chat",
      contextLength: 32768
    },
    {
      organization: "Qwen",
      modelName: "Qwen 1.5 Chat (1.8B)",
      modelString: "Qwen/Qwen1.5-1.8B-Chat",
      contextLength: 32768
    },
    {
      organization: "Qwen",
      modelName: "Qwen 1.5 Chat (4B)",
      modelString: "Qwen/Qwen1.5-4B-Chat",
      contextLength: 32768
    },
    {
      organization: "Qwen",
      modelName: "Qwen 1.5 Chat (7B)",
      modelString: "Qwen/Qwen1.5-7B-Chat",
      contextLength: 32768
    },
    {
      organization: "Qwen",
      modelName: "Qwen 1.5 Chat (14B)",
      modelString: "Qwen/Qwen1.5-14B-Chat",
      contextLength: 32768
    },
    {
      organization: "Qwen",
      modelName: "Qwen 1.5 Chat (32B)",
      modelString: "Qwen/Qwen1.5-32B-Chat",
      contextLength: 32768
    },
    {
      organization: "Qwen",
      modelName: "Qwen 1.5 Chat (72B)",
      modelString: "Qwen/Qwen1.5-72B-Chat",
      contextLength: 32768
    },
    {
      organization: "Snorkel AI",
      modelName: "Snorkel Mistral PairRM DPO (7B)",
      modelString: "snorkelai/Snorkel-Mistral-PairRM-DPO",
      contextLength: 32768
    },
    {
      organization: "Teknium",
      modelName: "OpenHermes-2-Mistral (7B)",
      modelString: "teknium/OpenHermes-2-Mistral-7B",
      contextLength: 8192
    },
    {
      organization: "Teknium",
      modelName: "OpenHermes-2.5-Mistral (7B)",
      modelString: "teknium/OpenHermes-2p5-Mistral-7B",
      contextLength: 8192
    },
    {
      organization: "Together",
      modelName: "LLaMA-2-7B-32K-Instruct (7B)",
      modelString: "togethercomputer/Llama-2-7B-32K-Instruct",
      contextLength: 32768
    },
    {
      organization: "Together",
      modelName: "RedPajama-INCITE Chat (3B)",
      modelString: "togethercomputer/RedPajama-INCITE-Chat-3B-v1",
      contextLength: 2048
    },
      {
        organization: "Together",
        modelName: "StripedHyena Nous (7B)",
        modelString: "togethercomputer/StripedHyena-Nous-7B",
        contextLength: 32768
      }
    ]
    
  
import type { Infographic } from "@/types";

export const bash: Infographic = {
  id: "bash",
  image: "/infographics/bash.png",
  imageWidth: 1586,
  imageHeight: 992,
  tags: ["DevOps", "Tools"],
  publishedAt: "2026-04-28",
  updatedAt: "2026-04-28",
  readingMinutes: 6,
  translations: {
    tr: {
      slug: "bash-temelleri",
      title: "Bash Temelleri: Her Geliştiricinin Bilmesi Gereken Terminal Komutları",
      description:
        "Linux/macOS terminalinde her geliştiricinin günlük olarak kullandığı temel Bash komutları — navigasyon, dosya yönetimi, arama ve örnek iş akışları.",
      imageAlt:
        "Bash Basics infografiği: navigasyon, listeleme, dosya yönetimi, içerik görüntüleme, arama ve faydalı komutları gösteren 10 bölümlü genel bakış",
      keywords: [
        "bash komutları",
        "linux terminal",
        "macOS terminal",
        "cd",
        "ls",
        "grep",
        "find",
      ],
      content: {
        intro:
          "Bash, Linux ve macOS başta olmak üzere Unix tabanlı sistemlerin standart kabuğudur. Yazılımcı olarak günlük iş akışınızda dosya yönetimi, build çalıştırma, log inceleme ve bulutta dağıtım gibi neredeyse her görev terminalden geçer. Bu rehberde infografikteki 10 bölümü açarak en sık kullanılan komutları örneklerle özetliyoruz; ezberlemek değil, hangi durumda hangisinin gerektiğini bilmek önemli.",
        sections: [
          {
            title: "Bash Nedir?",
            body: "Komut satırı arayüzü ve betikleme dili olan bir kabuktur. İşletim sistemiyle etkileşim kurmak için kullanılır. Linux, macOS ve WSL'de varsayılan olarak yüklü gelir; tek seferlik komutlar için interaktif modda, otomasyon için .sh dosyalarıyla kullanılır.",
            bullets: [
              "Komut çalıştırma",
              "İşletim sistemiyle etkileşim",
              "Linux, macOS, WSL'de yaygın",
            ],
          },
          {
            title: "Navigasyon",
            body: "Dosya sisteminde gezinmek için kullanılan üç temel komut: pwd, cd, ls.",
            code: {
              language: "bash",
              code: `pwd               # mevcut dizini yazdır
cd folder         # alt dizine geç
cd ..             # bir üst dizine
cd ~              # home dizinine
ls                # dosyaları listele`,
            },
          },
          {
            title: "Dosyaları Listeleme",
            body: "ls komutunun farklı bayraklarıyla detaylı görüntü alabilirsiniz.",
            code: {
              language: "bash",
              code: `ls               # liste
ls -l            # uzun format (izinler, boyut, tarih)
ls -a            # gizli dosyalar dahil
ls -lh           # insan okur boyutlar (KB, MB)`,
            },
          },
          {
            title: "Dosya & Dizin Yönetimi",
            body: "Oluşturma, taşıma, kopyalama ve silme operasyonları:",
            code: {
              language: "bash",
              code: `mkdir folder              # klasör oluştur
touch file.txt           # boş dosya oluştur
cp file.txt backup.txt   # kopyala
mv file.txt new.txt      # taşı / yeniden adlandır
rm file.txt              # sil
rm -r folder             # özyinelemeli sil`,
            },
          },
          {
            title: "Dosya İçeriği",
            body: "Dosya içeriğini görüntülemek için kullanılan komutlar:",
            code: {
              language: "bash",
              code: `cat file.txt        # içeriği yazdır
less file.txt       # sayfa sayfa oku (q ile çık)
head file.txt       # ilk 10 satır
tail file.txt       # son 10 satır
tail -f log.txt     # canlı log takibi`,
            },
          },
          {
            title: "Arama & Filtreleme",
            body: "Dosya içinde veya dosya sisteminde aramak için en güçlü iki komut grep ve find:",
            code: {
              language: "bash",
              code: `grep "hata" log.txt          # dosyada arama
grep -r "TODO" .             # özyinelemeli arama
find . -name "*.ts"          # ts dosyalarını bul
find . -type d -name "dist"  # dist klasörlerini bul`,
            },
          },
          {
            title: "Faydalı Komutlar",
            body: "Günlük işlerde sürekli ihtiyaç duyacağınız küçük komutlar:",
            code: {
              language: "bash",
              code: `clear            # ekranı temizle
echo "merhaba"   # ekrana yazdır
man ls           # komut dokümantasyonu
which node       # komutun yolunu göster
history          # önceki komutlar`,
            },
          },
          {
            title: "İpuçları",
            body: "Verimliliğinizi katlayan tetikleyiciler:",
            bullets: [
              "Tab — otomatik tamamlama (dosya/komut)",
              "↑ ↓ — komut geçmişinde gez",
              "Ctrl+C — çalışan komutu durdur",
              "Ctrl+R — geçmişte hızlı arama",
              "Ctrl+L — clear yerine kullan",
            ],
          },
          {
            title: "Tipik Bir İş Akışı",
            body: "Yeni bir proje oluştururken kullanacağınız zincirleme komutlar:",
            code: {
              language: "bash",
              code: `mkdir project
cd project
touch index.js
ls
# sonra:
git init
npm init -y`,
            },
          },
          {
            title: "Özet",
            body: "Bash; geliştiriciler ve DevOps için tüm sisteminizi kontrol etme aracıdır. GUI'den çok daha hızlı, scriptlenebilir ve uzaktan sunucularda da aynı şekilde çalışır. Sadece birkaç düzine komutu öğrenmek bile günlük verimliliğinizi belirgin biçimde artırır.",
          },
        ],
        faq: [
          {
            question: "Zsh ile farkı nedir?",
            answer:
              "Zsh büyük ölçüde Bash uyumludur ve ek özellikler (oh-my-zsh, otomatik tamamlama eklentileri) sunar. macOS'ta Catalina'dan beri varsayılan kabuk Zsh'dır. Bu rehberdeki komutların tamamı her ikisinde de aynı şekilde çalışır.",
          },
          {
            question: "Windows'ta Bash kullanabilir miyim?",
            answer:
              "Evet. WSL (Windows Subsystem for Linux) ile gerçek bir Linux kabuğu çalıştırabilirsiniz. Git Bash de günlük komutlar için iyi bir alternatiftir.",
          },
          {
            question: "rm -rf gerçekten tehlikeli mi?",
            answer:
              "Evet. rm -rf / sistem dosyalarınızı kalıcı olarak silebilir. Her zaman önce ls ile doğrulayın, gerekirse trash veya rm -i (interaktif) kullanın.",
          },
          {
            question: "Bash betikleri nasıl yazılır?",
            answer:
              ".sh uzantılı dosyalar oluşturur, başına #!/bin/bash shebang yazar ve chmod +x ile çalıştırılabilir yaparsınız. Değişkenler, döngüler ve fonksiyonlarla küçük otomasyonlar yazmak çok kolaydır.",
          },
          {
            question: "Verimlilik için ne öğrenmeli?",
            answer:
              "Tab autocomplete, alias, pipe (|), redirect (>), && / ||, history (Ctrl+R) ve grep/find kombinasyonları en çok zaman kazandıranlardır. Bunlara hâkim olmak yeterli.",
          },
        ],
      },
    },
    en: {
      slug: "bash-basics",
      title: "Bash Basics: Essential Terminal Commands Every Developer Should Know",
      description:
        "Core Bash commands every developer uses daily on Linux/macOS — navigation, file management, search and example workflows.",
      imageAlt:
        "Bash Basics infographic with sections on navigation, listing, file management, content viewing, search and useful commands across 10 panels",
      keywords: [
        "bash commands",
        "linux terminal",
        "macos terminal",
        "cd",
        "ls",
        "grep",
        "find",
      ],
      content: {
        intro:
          "Bash is the standard shell on Unix-based systems including Linux and macOS. As a developer, almost every daily task — file management, running builds, inspecting logs, deploying to the cloud — flows through the terminal. This guide walks through the 10 sections of the infographic, summarizing the most-used commands with examples; what matters is recognizing which command fits which situation, not memorizing them all.",
        sections: [
          {
            title: "What is Bash?",
            body: "A shell that's both a command-line interface and a scripting language. It's how you talk to the operating system. It ships by default on Linux, macOS and WSL; you use it interactively for one-off commands and via .sh files for automation.",
            bullets: [
              "Run commands",
              "Interact with the OS",
              "Common on Linux, macOS and WSL",
            ],
          },
          {
            title: "Navigation",
            body: "The three commands you'll move around the filesystem with: pwd, cd, ls.",
            code: {
              language: "bash",
              code: `pwd               # print current directory
cd folder         # enter a sub-directory
cd ..             # go up one level
cd ~              # go to home
ls                # list files`,
            },
          },
          {
            title: "Listing Files",
            body: "Different ls flags give you different levels of detail.",
            code: {
              language: "bash",
              code: `ls               # list
ls -l            # long format (perms, size, date)
ls -a            # include hidden files
ls -lh           # human-readable sizes (KB, MB)`,
            },
          },
          {
            title: "File & Directory Management",
            body: "Create, move, copy and delete operations:",
            code: {
              language: "bash",
              code: `mkdir folder              # create folder
touch file.txt           # create empty file
cp file.txt backup.txt   # copy
mv file.txt new.txt      # move / rename
rm file.txt              # delete
rm -r folder             # delete recursively`,
            },
          },
          {
            title: "File Content",
            body: "Commands for viewing what's inside files:",
            code: {
              language: "bash",
              code: `cat file.txt        # print content
less file.txt       # page through (q to quit)
head file.txt       # first 10 lines
tail file.txt       # last 10 lines
tail -f log.txt     # live-tail a log`,
            },
          },
          {
            title: "Search & Filter",
            body: "The two most powerful commands for searching inside files or the filesystem are grep and find:",
            code: {
              language: "bash",
              code: `grep "error" log.txt           # search in a file
grep -r "TODO" .               # recursive search
find . -name "*.ts"            # find ts files
find . -type d -name "dist"    # find dist directories`,
            },
          },
          {
            title: "Useful Commands",
            body: "Small but constantly-used utilities:",
            code: {
              language: "bash",
              code: `clear            # clear the screen
echo "hello"     # print to screen
man ls           # command manual
which node       # show command path
history          # previous commands`,
            },
          },
          {
            title: "Tips",
            body: "Shortcuts that multiply your productivity:",
            bullets: [
              "Tab — auto-complete (file/command)",
              "↑ ↓ — walk through history",
              "Ctrl+C — stop running command",
              "Ctrl+R — quick history search",
              "Ctrl+L — clear-screen shortcut",
            ],
          },
          {
            title: "A Common Workflow",
            body: "A chain of commands you'd run when starting a new project:",
            code: {
              language: "bash",
              code: `mkdir project
cd project
touch index.js
ls
# then:
git init
npm init -y`,
            },
          },
          {
            title: "Summary",
            body: "Bash gives developers and DevOps full control of their system. It's faster than a GUI, scriptable, and works the same way on remote servers. Even just a couple of dozen commands will noticeably boost your daily productivity.",
          },
        ],
        faq: [
          {
            question: "How is Zsh different from Bash?",
            answer:
              "Zsh is largely Bash-compatible and adds extra features (oh-my-zsh, autocomplete plugins). It's been the macOS default since Catalina. Every command in this guide works the same in both.",
          },
          {
            question: "Can I use Bash on Windows?",
            answer:
              "Yes. WSL (Windows Subsystem for Linux) gives you a real Linux shell. Git Bash is also a fine alternative for everyday commands.",
          },
          {
            question: "Is rm -rf really dangerous?",
            answer:
              "Yes. rm -rf / can permanently wipe system files. Always verify the path with ls first, and consider trash or rm -i (interactive).",
          },
          {
            question: "How do I write a Bash script?",
            answer:
              "Create a .sh file, add #!/bin/bash at the top and run chmod +x to make it executable. Variables, loops and functions make small automations easy.",
          },
          {
            question: "What should I learn for productivity?",
            answer:
              "Tab autocomplete, aliases, pipes (|), redirects (>), && / ||, history (Ctrl+R) and grep/find combinations buy you the most time. Master these and you're set.",
          },
        ],
      },
    },
  },
};

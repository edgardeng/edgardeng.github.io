# Maven
> [Maven](http://maven.apache.org/) (Apache的一个纯Java开源项目)是一个项目管理工具，主要用于项目构建，依赖管理，项目信息管理.

## 一、maven概述

maven包含了一个项目对象模型 (Project Object Model)，一组标准集合，一个项目生命周期(Project Lifecycle)，一个依赖管理系统(Dependency Management System)，和用来运行定义在生命周期阶段(phase)中插件(plugin)目标(goal)的逻辑。当你使用Maven的时候，你用一个明确定义的项目对象模型来描述你的项目，然后Maven可以应用横切的逻辑，这些逻辑来自一组共享的（或者自定义的）插件。

*Maven的作用*

1. 依赖管理
  > pom.xml 通过在此文件中配置jar包的坐标即可将jar包引入到工程中。Jar包的坐标可从maven仓库中获取
  
2.  项目构建
  > 项目构建是一个项目从编写源代码到编译，测试，运行，打包，部署，运行的过程。
 
## 二、环境准备

1. [Maven官方下载](http://maven.apache.org/download.cgi) binary zip archive

2. 解压文件到自定义目录

3. 设置bin目录为系统环境， 使用`mvn -v`测试安装成功

## 三、Maven的核心知识

### Maven项目的文件结构

```
src/main/java - 存放项目.java文件；
src/main/resources - 存放项目资源文件；
src/test/java - 存放测试类.java文件；
src/test/resources - 存放测试资源文件；
target - 项目输出目录；
pom.xml - Maven核心文件（Project Object Model）；
```

### 常用命令

* mvn -v 
  > 查看maven版本
* mvn compile 
  > 编译源代码, 用来将src/main/java下的文件编译为class文件，并输出到target中。
* mvn test test 用来将src/main/test下的文件进行编译，同时执行一次
* mvn package 打包,将项目进行打包，如果是jar打包为jar，war打包为war。
* mvn clean 删除编译产生的target文件夹
* mvn install 安装jar包到本地仓库中
* mvn archetype：create 创建Maven项目
* mvn compile 编译源代码
* mvn deploy 发布项目
* mvn test-compile 编译测试源代码
* mvn test 运行应用程序中的单元测试
* mvn site 生成项目相关信息的网站
* mvn eclipse:eclipse 生成eclipse项目文件
* mvnjetty:run 启动jetty服务
* mvntomcat:run 启动tomcat服务
* mvn clean package -Dmaven.test.skip=true 清除以前的包后重新打包，跳过测试类
* mvn eclipse:clean 清除Project中以前的编译的东西，重新再来
* mvn eclipse:eclipse 开始编译Maven的Project
* mvn clean package 清除以前的包后重新打包
 
  Maven 有一个生命周期，当你运行 mvn install 的时候被调用。这条命令告诉 Maven 执行一系列的有序的步骤，直到到达你指定的生命周期。遍历生命周期旅途中的一个影响就是，Maven 运行了许多默认的插件目标，这些目标完成了像编译和创建一个 JAR 文件这样的工作。

### Maven仓库

> maven仓库用来存储jar包。maven项目都是从仓库中获取jar包。maven仓库分三种：本地仓库，远程仓库，中央仓库。

* 本地仓库：用来存储从远程仓库及中央仓库下载的jar包，自己来维护。项目使用的jar包优先从本地仓库获取。本地仓库的默认位置在𝑢𝑠𝑒𝑟.ℎ𝑜𝑚𝑒/.𝑚2/𝑟𝑒𝑝𝑜𝑠𝑖𝑡𝑜𝑟𝑦。{user.home}表示用户所在的位置。
* 远程仓库：如果本地仓库没有所需要的jar包，默认去远程仓库下载。远程仓库由公司来进行维护又可称为私服。
* 中央仓库：中央仓库由maven团队来进行维护，服务于整个互联网。其仓库中存储大量的jar包。

**本地仓库的配置在settings.xml文件中修改。**

三种仓库的关系:

  本地项目需要jar包，先从本地仓库中获取，如果本地仓库中没有，则从私服中获取，如果私服没有，则从中央仓库获取。

  获取到后，本地仓库及远程仓库各存储一份。如果没有远程仓库，本地仓库则直接从中央仓库获取，然后在本地仓库存储一份。

### 依赖

① maven解析依赖信息时会到本地仓库中取查找被依赖的jar包
  > 对于本地仓库中没有的会去中央仓库去查找maven坐标来获取jar包，获取到jar之后会下载到本地仓库

② 如果依赖的是自己或者团队开发的maven工程，需要先使用install命令把被依赖的maven工程的jar包导入到本地仓库中

③ 依赖范围

  1、compile，默认值，适用于所有阶段（开发、测试、部署、运行），本jar会一直存在所有阶段。
  
  2、provided，只在开发、测试阶段使用，目的是不让Servlet容器和你本地仓库的jar包冲突 。如servlet.jar。
  
  3、runtime，只在运行时使用，如JDBC驱动，适用运行和测试阶段。
  
  4、test，只在测试时使用，用于编译和运行测试代码。不会随项目发布。
  
  5、system，类似provided，需要显式提供包含依赖的jar，Maven不会在Repository中查找它。
  
  |scope	|编译	|测试	|运行|
  |:----|:----|:----|:----|
  |compile|	Y	|Y|	Y|
  |test	|	Y	||
  |provided	|Y	|Y|	
  |runtime|		Y|	Y|
  |system	|Y	|Y|	
  
### 生命周期 
> maven对项目的构建分为三套相互独立的生命周期。

* cleanLifecycle:   在项目构建前，先进行一些清理工作。
* defaultLifecycle: 构建的核心部分，编译，测试，打包，部署。
* siteLifecycle：   生成项目报告，站点，发布报告。

maven的每个生命周期都有很多阶段，每个阶段对应一个执行命令。

#### clean 生命周期：清理项目，包含三个phase

1）pre-clean：执行清理前需要完成的工作
2）clean：清理上一次构建生成的文件
3）post-clean：执行清理后需要完成的工作

#### default 生命周期：构建项目，重要的phase如下

1）validate：验证工程是否正确，所有需要的资源是否可用。
2）compile：编译项目的源代码。
3）test：使用合适的单元测试框架来测试已编译的源代码。这些测试不需要已打包和布署。
4）package：把已编译的代码打包成可发布的格式，比如jar。
5）integration-test：如有需要，将包处理和发布到一个能够进行集成测试的环境。
6）verify：运行所有检查，验证包是否有效且达到质量标准。
7）install：把包安装到maven本地仓库，可以被其他工程作为依赖来使用。
8）deploy：在集成或者发布环境下执行，将最终版本的包拷贝到远程的repository，使得其他的开发者或者工程可以共享。

#### site 生命周期：建立和发布项目站点，phase如下

1）pre-site：生成项目站点之前需要完成的工作
2）site：生成项目站点文档
3）post-site：生成项目站点之后需要完成的工作
4）site-deploy：将项目站点发布到服务器

命令与生命周期关系

每个maven命令对应生命周期的某一阶段，例如clean命令对应maven的clean阶段。test命令对应maven的default阶段。
执行命令会自动将该阶段以前的命令执行，例如执行clean命令，将自动执行pre-clean命令。
执行某个生命周期某个阶段，不会影响生命周期其他阶段。
如果要执行多个生命周期的命令，中间用空格隔开，例如mvn clean compile。

### 插件
Maven本质上是一个插件框架，它的核心并不执行任何具体的构建任务，所有这些任务都交给插件来完成

例如编译源代码是由maven-compiler-plugin完成的。

每个任务对应了一个插件目标（goal），每个插件会有一个或者多个目标，例如maven-compiler-plugin的compile目标用来编译位于src/main/java/目录下的主源码，testCompile目标用来编译位于src/test/java/目录下的测试源码。

用户可以通过两种方式调用Maven插件目标。

第一种方式是将插件目标与生命周期阶段（lifecycle phase）绑定，这样用户在命令行只是输入生命周期阶段而已，例如Maven默认将maven-compiler-plugin的compile目标与 compile生命周期阶段绑定，因此命令mvn compile实际上是先定位到compile这一生命周期阶段，然后再根据绑定关系调用maven-compiler-plugin的compile目标。

第二种方式是直接在命令行指定要执行的插件目标，例如mvn archetype:generate 就表示调用maven-archetype-plugin的generate目标，这种带冒号的调用方式与生命周期无关。

### Pom 文件解析
> setting.xml主要用于配置maven的运行环境等一系列通用的属性，是全局级别的配置文件；而pom.xml主要描述了项目的maven坐标，依赖关系，开发者需要遵循的规则，缺陷管理系统，组织和licenses，以及其他所有的项目相关因素，是项目级别的配置文件。

#### 基础配置

一个典型的pom.xml文件配置如下：
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0http://maven.apache.org/xsd/maven-4.0.0.xsd">  
  
    <!-- 模型版本。maven3.0必须是这样写，现在是maven3唯一支持的版本 -->  
    <modelVersion>4.0.0</modelVersion>  
    <!-- 公司或者组织的唯一标志，并且配置时生成的路径也是由此生成， 如com.winner.trade，maven会将该项目打成的jar包放本地路径：/com/winner/trade -->  
    <groupId>com.winner.trade</groupId>
    <!-- 本项目的唯一ID，一个groupId下面可能多个项目，就是靠artifactId来区分的 -->  
    <artifactId>trade-core</artifactId>  
    <!-- 本项目目前所处的版本号 -->  
    <version>1.0.0-SNAPSHOT</version>  
    <!-- 打包的机制，如pom,jar, maven-plugin, ejb, war, ear, rar, par，默认为jar -->  
    <packaging>jar</packaging>  
    <!-- 帮助定义构件输出的一些附属构件,附属构件与主构件对应，有时候需要加上classifier才能唯一的确定该构件 不能直接定义项目的classifer,因为附属构件不是项目直接默认生成的，而是由附加的插件帮助生成的 -->  
    <classifier>...</classifier>  
    <!-- 定义本项目的依赖关系 -->  
    <dependencies>  
        <!-- 每个dependency都对应这一个jar包 -->  
        <dependency> 
            <!--一般情况下，maven是通过groupId、artifactId、version这三个元素值（俗称坐标）来检索该构件， 然后引入你的工程。如果别人想引用你现在开发的这个项目（前提是已开发完毕并发布到了远程仓库），-->   
            <!--就需要在他的pom文件中新建一个dependency节点，将本项目的groupId、artifactId、version写入， maven就会把你上传的jar包下载到他的本地 -->  
            <groupId>com.winner.trade</groupId>  
            <artifactId>trade-test</artifactId>  
            <version>1.0.0-SNAPSHOT</version>
            <!-- maven认为，程序对外部的依赖会随着程序的所处阶段和应用场景而变化，所以maven中的依赖关系有作用域(scope)的限制。 -->  
            <!--scope包含如下的取值：compile（编译范围）、provided（已提供范围）、runtime（运行时范围）、test（测试范围）、system（系统范围） -->  
            <scope>test</scope>
            <!-- 设置指依赖是否可选，默认为false,即子项目默认都继承:为true,则子项目必需显示的引入，与dependencyManagement里定义的依赖类似  -->  
            <optional>false</optional>  
            <!-- 屏蔽依赖关系。 比如项目中使用的libA依赖某个库的1.0版，libB依赖某个库的2.0版，现在想统一使用2.0版，就应该屏蔽掉对1.0版的依赖 -->  
            <exclusions>  
                <exclusion>  
                    <groupId>org.slf4j</groupId>  
                    <artifactId>slf4j-api</artifactId>  
                </exclusion>  
            </exclusions>  
        </dependency>  
    </dependencies>  
  
    <!-- 为pom定义一些常量，在pom中的其它地方可以直接引用 使用方式 如下 ：${file.encoding} -->  
    <properties>  
        <file.encoding>UTF-8</file.encoding>  
        <java.source.version>1.5</java.source.version>  
        <java.target.version>1.5</java.target.version>  
    </properties>  
</project> 
```
 
> 上面的几个配置项对任何项目都是必不可少的，定义了项目的基本属性。

classifier元素(不太常用)用来帮助定义构件输出的一些附属构件。附属构件与主构件对应，比如主构件是 kimi-app-2.0.0.jar，该项目可能还会通过使用一些插件生成 如kimi-app-2.0.0-javadoc.jar （Java文档）、 kimi-app-2.0.0-sources.jar（Java源代码）这样两个附属构件。这时候，javadoc、sources就是这两个附属构件的classifier，这样附属构件也就拥有了自己唯一的坐标。

classifier的用途在于: maven download javadoc / sources jar包的时候，需要借助classifier指明要下载那个附属构件
引入依赖的时候，有时候仅凭groupId、artifactId、version无法唯一的确定某个构件，需要借助classifier来进一步明确目标。比如JSON-lib，有时候会同一个版本会提供多个jar包，在JDK1.5环境下是一套，在JDK1.3环境下是一套

引用它的时候就要注明JDK版本，否则maven不知道你到底需要哪一套jar包：
```xml
<dependency>
    <groupId>net.sf.json-lib</groupId>
    <artifactId>json-lib</artifactId>
    <version>2.4</version>
    <classifier>jdk15</classifier>
</dependency>
```

#### 构建配置

```xml
<build>  
  
    <!-- 产生的构件的文件名，默认值是${artifactId}-${version}。 -->  
    <finalName>myPorjectName</finalName>  
    <!-- 构建产生的所有文件存放的目录,默认为${basedir}/target，即项目根目录下的target -->  
    <directory>${basedir}/target</directory>  
    <!--当项目没有规定目标（Maven2叫做阶段（phase））时的默认值， -->  
    <!--必须跟命令行上的参数相同例如jar:jar，或者与某个阶段（phase）相同例如install、compile等 -->  
    <defaultGoal>install</defaultGoal>  
    <!--当filtering开关打开时，使用到的过滤器属性文件列表。 -->  
    <!--项目配置信息中诸如${spring.version}之类的占位符会被属性文件中的实际值替换掉 -->  
    <filters>  
        <filter>../filter.properties</filter>  
    </filters>  
    <!--项目相关的所有资源路径列表，例如和项目相关的配置文件、属性文件，这些资源被包含在最终的打包文件里。 -->  
    <resources>  
        <resource>  
            <!--描述了资源的目标路径。该路径相对target/classes目录（例如${project.build.outputDirectory}）。 -->  
            <!--举个例子，如果你想资源在特定的包里(org.apache.maven.messages)，你就必须该元素设置为org/apache/maven/messages。 -->  
            <!--然而，如果你只是想把资源放到源码目录结构里，就不需要该配置。 -->  
            <targetPath>resources</targetPath>  
            <!--是否使用参数值代替参数名。参数值取自properties元素或者文件里配置的属性，文件在filters元素里列出。 -->  
            <filtering>true</filtering>  
  
            <!--描述存放资源的目录，该路径相对POM路径 -->  
            <directory>src/main/resources</directory>  
  
            <!--包含的模式列表 -->  
            <includes>  
                <include>**/*.properties</include>  
                <include>**/*.xml</include>  
            </includes>  
  
            <!--排除的模式列表 如果<include>与<exclude>划定的范围存在冲突，以<exclude>为准 -->  
            <excludes>  
                <exclude>jdbc.properties</exclude>  
            </excludes>  
  
        </resource>  
    </resources>  
  
    <!--单元测试相关的所有资源路径，配制方法与resources类似 -->  
    <testResources>  
        <testResource>  
            <targetPath />  
            <filtering />  
            <directory />  
            <includes />  
            <excludes />  
        </testResource>  
    </testResources>  
  
    <!--项目源码目录，当构建项目的时候，构建系统会编译目录里的源码。该路径是相对于pom.xml的相对路径。 -->  
    <sourceDirectory>${basedir}\src\main\java</sourceDirectory>  
  
    <!--项目脚本源码目录，该目录和源码目录不同， <!-- 绝大多数情况下，该目录下的内容会被拷贝到输出目录(因为脚本是被解释的，而不是被编译的)。 -->  
    <scriptSourceDirectory>${basedir}\src\main\scripts  
    </scriptSourceDirectory>  
  
    <!--项目单元测试使用的源码目录，当测试项目的时候，构建系统会编译目录里的源码。该路径是相对于pom.xml的相对路径。 -->  
    <testSourceDirectory>${basedir}\src\test\java</testSourceDirectory>  
  
    <!--被编译过的应用程序class文件存放的目录。 -->  
    <outputDirectory>${basedir}\target\classes</outputDirectory>  
  
    <!--被编译过的测试class文件存放的目录。 -->  
    <testOutputDirectory>${basedir}\target\test-classes  
    </testOutputDirectory>  
  
    <!--项目的一系列构建扩展,它们是一系列build过程中要使用的产品，会包含在running bulid‘s classpath里面。 -->  
    <!--他们可以开启extensions，也可以通过提供条件来激活plugins。 -->  
    <!--简单来讲，extensions是在build过程被激活的产品 -->  
    <extensions>  
  
        <!--例如，通常情况下，程序开发完成后部署到线上Linux服务器，可能需要经历打包、 -->  
        <!--将包文件传到服务器、SSH连上服务器、敲命令启动程序等一系列繁琐的步骤。 -->  
        <!--实际上这些步骤都可以通过Maven的一个插件 wagon-maven-plugin 来自动完成 -->  
        <!--下面的扩展插件wagon-ssh用于通过SSH的方式连接远程服务器， -->  
        <!--类似的还有支持ftp方式的wagon-ftp插件 -->  
        <extension>  
            <groupId>org.apache.maven.wagon</groupId>  
            <artifactId>wagon-ssh</artifactId>  
            <version>2.8</version>  
        </extension>  
  
    </extensions>  
  
    <!--使用的插件列表 。 -->  
    <plugins>  
        <plugin>  
            <groupId></groupId>  
            <artifactId>maven-assembly-plugin</artifactId>  
            <version>2.5.5</version>  
  
            <!--在构建生命周期中执行一组目标的配置。每个目标可能有不同的配置。 -->  
            <executions>  
                <execution>  
  
                    <!--执行目标的标识符，用于标识构建过程中的目标，或者匹配继承过程中需要合并的执行目标 -->  
                    <id>assembly</id>  
  
                    <!--绑定了目标的构建生命周期阶段，如果省略，目标会被绑定到源数据里配置的默认阶段 -->  
                    <phase>package</phase>  
  
                    <!--配置的执行目标 -->  
                    <goals>  
                        <goal>single</goal>  
                    </goals>  
  
                    <!--配置是否被传播到子POM -->  
                    <inherited>false</inherited>  
  
                </execution>  
            </executions>  
  
            <!--作为DOM对象的配置,配置项因插件而异 -->  
            <configuration>  
                <finalName>${finalName}</finalName>  
                <appendAssemblyId>false</appendAssemblyId>  
                <descriptor>assembly.xml</descriptor>  
            </configuration>  
  
            <!--是否从该插件下载Maven扩展（例如打包和类型处理器）， -->  
            <!--由于性能原因，只有在真需要下载时，该元素才被设置成true。 -->  
            <extensions>false</extensions>  
  
            <!--项目引入插件所需要的额外依赖 -->  
            <dependencies>  
                <dependency>...</dependency>  
            </dependencies>  
  
            <!--任何配置是否被传播到子项目 -->  
            <inherited>true</inherited>  
  
        </plugin>  
    </plugins>  
  
    <!--主要定义插件的共同元素、扩展元素集合，类似于dependencyManagement， -->  
    <!--所有继承于此项目的子项目都能使用。该插件配置项直到被引用时才会被解析或绑定到生命周期。 -->  
    <!--给定插件的任何本地配置都会覆盖这里的配置 -->  
    <pluginManagement>  
        <plugins>...</plugins>  
    </pluginManagement>  
</build> 
```

pom里面的仓库与setting.xml里的仓库功能是一样的。
区别在于，pom里的仓库是个性化的。比如一家大公司里的setting文件是公用的，所有项目都用一个setting文件，但各个子项目却会引用不同的第三方库，所以就需要在pom里设置自己需要的仓库地址。

#### 分发配置

```xml
<!--项目分发信息，在执行mvn deploy后表示要发布的位置。 -->  
<!--有了这些信息就可以把网站部署到远程服务器或者把构件部署到远程仓库。 -->  
<distributionManagement>  
  
    <!--部署项目产生的构件到远程仓库需要的信息 -->  
    <repository>  
  
        <!--是分配给快照一个唯一的版本号（由时间戳和构建流水号），还是每次都使用相同的版本号 -->  
        <!--参见repositories/repository元素 -->  
        <uniqueVersion>true</uniqueVersion>  
  
        <id> repo-id </id>  
        <name> repo-name</name>  
        <url>file://${basedir}/target/deploy </url>  
        <layout />  
  
    </repository>  
  
    <!--构件的快照部署到哪里,如果没有配置该元素，默认部署到repository元素配置的仓库 -->  
    <snapshotRepository>  
        <uniqueVersion />  
        <id />  
        <name />  
        <url />  
        <layout />  
    </snapshotRepository>  
  
    <!--部署项目的网站需要的信息 -->  
    <site>  
  
        <!--部署位置的唯一标识符，用来匹配站点和settings.xml文件里的配置 -->  
        <id> site-id </id>  
  
        <!--部署位置的名称 -->  
        <name> site-name</name>  
  
        <!--部署位置的URL，按protocol://hostname/path形式 -->  
        <url>scp://svn.baidu.com/banseon:/var/www/localhost/banseon-web </url>  
  
    </site>  
  
    <!--项目下载页面的URL。如果没有该元素，用户应该参考主页。 -->  
    <!--使用该元素的原因是：帮助定位那些不在仓库里的构件（由于license限制）。 -->  
    <downloadUrl />  
  
    <!--如果构件有了新的groupID和artifact ID（构件移到了新的位置），这里列出构件的重定位信息。 -->  
    <relocation>  
  
        <!--构件新的group ID -->  
        <groupId />  
  
        <!--构件新的artifact ID -->  
        <artifactId />  
  
        <!--构件新的版本号 -->  
        <version />  
  
        <!--显示给用户的，关于移动的额外信息，例如原因。 -->  
        <message />  
  
    </relocation>  
  
    <!--给出该构件在远程仓库的状态。不得在本地项目中设置该元素，因为这是工具自动更新的。 -->  
    <!--有效的值有：none（默认），converted（仓库管理员从Maven 1 POM转换过来）， -->  
    <!--partner（直接从伙伴Maven 2仓库同步过来），deployed（从Maven 2实例部署），verified（被核实时正确的和最终的）。 -->  
    <status />  
  
</distributionManagement>  
```

#### 仓库配置
```xml
<!--发现依赖和扩展的远程仓库列表。 -->  
<repositories>  
  
    <!--包含需要连接到远程仓库的信息 -->  
    <repository>  
  
        <!--如何处理远程仓库里发布版本的下载 -->  
        <releases>  
  
            <!--true或者false表示该仓库是否为下载某种类型构件（发布版，快照版）开启。 -->  
            <enabled />  
  
            <!--该元素指定更新发生的频率。Maven会比较本地POM和远程POM的时间戳。 -->  
            <!--这里的选项是：always（一直），daily（默认，每日）， -->  
            <!--interval：X（这里X是以分钟为单位的时间间隔），或者never（从不）。 -->  
            <updatePolicy />  
  
            <!--当Maven验证构件校验文件失败时该怎么做： -->  
            <!--ignore（忽略），fail（失败），或者warn（警告）。 -->  
            <checksumPolicy />  
  
        </releases>  
  
        <!--如何处理远程仓库里快照版本的下载。有了releases和snapshots这两组配置， -->  
        <!--POM就可以在每个单独的仓库中，为每种类型的构件采取不同的策略。 -->  
        <!--例如，可能有人会决定只为开发目的开启对快照版本下载的支持 -->  
        <snapshots>  
            <enabled />  
            <updatePolicy />  
            <checksumPolicy />  
        </snapshots>  
  
        <!--远程仓库唯一标识符。可以用来匹配在settings.xml文件里配置的远程仓库 -->  
        <id> repo-id </id>  
  
        <!--远程仓库名称 -->  
        <name> repo-name</name>  
  
        <!--远程仓库URL，按protocol://hostname/path形式 -->  
        <url>http://192.168.1.169:9999/repository/ </url>  
  
        <!--用于定位和排序构件的仓库布局类型-可以是default（默认）或者legacy（遗留）。 -->  
        <!--Maven 2为其仓库提供了一个默认的布局； -->  
        <!--然而，Maven1.x有一种不同的布局。 -->  
        <!--我们可以使用该元素指定布局是default（默认）还是legacy（遗留）。 -->  
        <layout> default</layout>  
  
    </repository>  
  
</repositories>  
  
<!--发现插件的远程仓库列表，这些插件用于构建和报表 -->  
<pluginRepositories>  
  
    <!--包含需要连接到远程插件仓库的信息.参见repositories/repository元素 -->  
    <pluginRepository />  
  
</pluginRepositories>  

```

#### profile配置

```xml
<!--在列的项目构建profile，如果被激活，会修改构建处理 -->  
<profiles>  
  
    <!--根据环境参数或命令行参数激活某个构建处理 -->  
    <profile>  
        <!--自动触发profile的条件逻辑。Activation是profile的开启钥匙。 -->  
        <activation>  
  
            <!--profile默认是否激活的标识 -->  
            <activeByDefault>false</activeByDefault>  
  
            <!--activation有一个内建的java版本检测，如果检测到jdk版本与期待的一样，profile被激活。 -->  
            <jdk>1.7</jdk>  
  
            <!--当匹配的操作系统属性被检测到，profile被激活。os元素可以定义一些操作系统相关的属性。 -->  
            <os>  
  
                <!--激活profile的操作系统的名字 -->  
                <name>Windows XP</name>  
  
                <!--激活profile的操作系统所属家族(如 'windows') -->  
                <family>Windows</family>  
  
                <!--激活profile的操作系统体系结构 -->  
                <arch>x86</arch>  
  
                <!--激活profile的操作系统版本 -->  
                <version>5.1.2600</version>  
  
            </os>  
  
            <!--如果Maven检测到某一个属性（其值可以在POM中通过${名称}引用），其拥有对应的名称和值，Profile就会被激活。 -->  
            <!-- 如果值字段是空的，那么存在属性名称字段就会激活profile，否则按区分大小写方式匹配属性值字段 -->  
            <property>  
  
                <!--激活profile的属性的名称 -->  
                <name>mavenVersion</name>  
  
                <!--激活profile的属性的值 -->  
                <value>2.0.3</value>  
  
            </property>  
  
            <!--提供一个文件名，通过检测该文件的存在或不存在来激活profile。missing检查文件是否存在，如果不存在则激活profile。 -->  
            <!--另一方面，exists则会检查文件是否存在，如果存在则激活profile。 -->  
            <file>  
  
                <!--如果指定的文件存在，则激活profile。 -->  
                <exists>/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/</exists>  
  
                <!--如果指定的文件不存在，则激活profile。 -->  
                <missing>/usr/local/hudson/hudson-home/jobs/maven-guide-zh-to-production/workspace/</missing>  
  
            </file>  
  
        </activation>  
        <id />  
        <build />  
        <modules />  
        <repositories />  
        <pluginRepositories />  
        <dependencies />  
        <reporting />  
        <dependencyManagement />  
        <distributionManagement />  
        <properties />  
    </profile>
```
 
profile配置项在setting.xml中也有，是pom.xml中profile元素的裁剪版本，包含了id，activation, repositories, pluginRepositories和properties元素。这里的profile元素只包含这五个子元素是因为setting.xml只关心构建系统这个整体（这正是settings.xml文件的角色定位），而非单独的项目对象模型设置。如果一个settings中的profile被激活，它的值会覆盖任何其它定义在POM中或者profile.xml中的带有相同id的profile。

pom.xml中的profile可以看做pom.xml的副本，拥有与pom.xml相同的子元素与配置方法。它包含可选的activation（profile的触发器）和一系列的changes。例如test过程可能会指向不同的数据库（相对最终的deployment）或者不同的dependencies或者不同的repositories，并且是根据不同的JDK来改变的。只需要其中一个成立就可以激活profile，如果第一个条件满足了，那么后面就不会在进行匹配。

#### 报表配置

```xml
<!--描述使用报表插件产生报表的规范,特定的maven 插件能输出相应的定制和配置报表. -->  
<!--当用户执行“mvn site”，这些报表就会运行,在页面导航栏能看到所有报表的链接。 -->  
<reporting>  
  
    <!--true，则网站不包括默认的报表。这包括“项目信息”菜单中的报表。 -->  
    <excludeDefaults />  
  
    <!--所有产生的报表存放到哪里。默认值是${project.build.directory}/site。 -->  
    <outputDirectory />  
  
    <!--使用的报表插件和他们的配置。 -->  
    <plugins>  
  
        <plugin>  
            <groupId />  
            <artifactId />  
            <version />  
            <inherited />  
            <configuration>  
                <links>  
                    <link>http://java.sun.com/j2se/1.5.0/docs/api/</link>  
                </links>  
            </configuration>  
            <!--一组报表的多重规范，每个规范可能有不同的配置。 -->  
            <!--一个规范（报表集）对应一个执行目标 。例如，有1，2，3，4，5，6，7，8，9个报表。 -->  
            <!--1，2，5构成A报表集，对应一个执行目标。2，5，8构成B报表集，对应另一个执行目标 -->  
            <reportSets>  
  
                <!--表示报表的一个集合，以及产生该集合的配置 -->  
                <reportSet>  
  
                    <!--报表集合的唯一标识符，POM继承时用到 -->  
                    <id>sunlink</id>  
  
                    <!--产生报表集合时，被使用的报表的配置 -->  
                    <configuration />  
  
                    <!--配置是否被继承到子POMs -->  
                    <inherited />  
  
                    <!--这个集合里使用到哪些报表 -->  
                    <reports>  
                        <report>javadoc</report>  
                    </reports>  
  
                </reportSet>  
  
            </reportSets>  
  
        </plugin>  
  
    </plugins>  
  
</reporting> 
```
    
#### 环境配置
```xml
<!--项目的问题管理系统(Bugzilla, Jira, Scarab,或任何你喜欢的问题管理系统)的名称和URL，本例为 jira -->  
<issueManagement>  
  
    <!--问题管理系统（例如jira）的名字， -->  
    <system> jira </system>  
  
    <!--该项目使用的问题管理系统的URL -->  
    <url> http://jira.clf.com/</url>  
  
</issueManagement>  
  
<!--项目持续集成信息 -->  
<ciManagement>  
  
    <!--持续集成系统的名字，例如continuum -->  
    <system />  
  
    <!--该项目使用的持续集成系统的URL（如果持续集成系统有web接口的话）。 -->  
    <url />  
  
    <!--构建完成时，需要通知的开发者/用户的配置项。包括被通知者信息和通知条件（错误，失败，成功，警告） -->  
    <notifiers>  
  
        <!--配置一种方式，当构建中断时，以该方式通知用户/开发者 -->  
        <notifier>  
  
            <!--传送通知的途径 -->  
            <type />  
  
            <!--发生错误时是否通知 -->  
            <sendOnError />  
  
            <!--构建失败时是否通知 -->  
            <sendOnFailure />  
  
            <!--构建成功时是否通知 -->  
            <sendOnSuccess />  
  
            <!--发生警告时是否通知 -->  
            <sendOnWarning />  
  
            <!--不赞成使用。通知发送到哪里 -->  
            <address />  
  
            <!--扩展配置项 -->  
            <configuration />  
  
        </notifier>  
  
    </notifiers>  
  
</ciManagement> 

``` 

#### 项目信息配置

```xml
<!--项目的名称, Maven产生的文档用 -->  
<name>banseon-maven </name>  
  
<!--项目主页的URL, Maven产生的文档用 -->  
<url>http://www.clf.com/ </url>  
  
<!--项目的详细描述, Maven 产生的文档用。 当这个元素能够用HTML格式描述时 -->  
<!--（例如，CDATA中的文本会被解析器忽略，就可以包含HTML标签），不鼓励使用纯文本描述。 -->  
<!-- 如果你需要修改产生的web站点的索引页面，你应该修改你自己的索引页文件，而不是调整这里的文档。 -->  
<description>A maven project to study maven. </description>  
  
<!--描述了这个项目构建环境中的前提条件。 -->  
<prerequisites>  
  
    <!--构建该项目或使用该插件所需要的Maven的最低版本 -->  
    <maven />  
  
</prerequisites>  
  
<!--项目创建年份，4位数字。当产生版权信息时需要使用这个值。 -->  
<inceptionYear />  
  
<!--项目相关邮件列表信息 -->  
<mailingLists>  
  
    <!--该元素描述了项目相关的所有邮件列表。自动产生的网站引用这些信息。 -->  
    <mailingList>  
  
        <!--邮件的名称 -->  
        <name> Demo </name>  
  
        <!--发送邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 -->  
        <post> clf@126.com</post>  
  
        <!--订阅邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 -->  
        <subscribe> clf@126.com</subscribe>  
  
        <!--取消订阅邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 -->  
        <unsubscribe> clf@126.com</unsubscribe>  
  
        <!--你可以浏览邮件信息的URL -->  
        <archive> http:/hi.clf.com/</archive>  
  
    </mailingList>  
  
</mailingLists>  
  
<!--项目开发者列表 -->  
<developers>  
  
    <!--某个项目开发者的信息 -->  
    <developer>  
  
        <!--SCM里项目开发者的唯一标识符 -->  
        <id> HELLO WORLD </id>  
  
        <!--项目开发者的全名 -->  
        <name> banseon </name>  
  
        <!--项目开发者的email -->  
        <email> banseon@126.com</email>  
  
        <!--项目开发者的主页的URL -->  
        <url />  
  
        <!--项目开发者在项目中扮演的角色，角色元素描述了各种角色 -->  
        <roles>  
            <role> Project Manager</role>  
            <role>Architect </role>  
        </roles>  
  
        <!--项目开发者所属组织 -->  
        <organization> demo</organization>  
  
        <!--项目开发者所属组织的URL -->  
        <organizationUrl>http://hi.clf.com/ </organizationUrl>  
  
        <!--项目开发者属性，如即时消息如何处理等 -->  
        <properties>  
            <dept> No </dept>  
        </properties>  
  
        <!--项目开发者所在时区， -11到12范围内的整数。 -->  
        <timezone> -5</timezone>  
  
    </developer>  
  
</developers>  
  
<!--项目的其他贡献者列表 -->  
<contributors>  
  
    <!--项目的其他贡献者。参见developers/developer元素 -->  
    <contributor>  
        <name />  
        <email />  
        <url />  
        <organization />  
        <organizationUrl />  
        <roles />  
        <timezone />  
        <properties />  
    </contributor>  
  
</contributors>  
  
<!--该元素描述了项目所有License列表。应该只列出该项目的license列表，不要列出依赖项目的license列表。 -->  
<!--如果列出多个license，用户可以选择它们中的一个而不是接受所有license。 -->  
<licenses>  
  
    <!--描述了项目的license，用于生成项目的web站点的license页面，其他一些报表和validation也会用到该元素。 -->  
    <license>  
  
        <!--license用于法律上的名称 -->  
        <name> Apache 2 </name>  
  
        <!--官方的license正文页面的URL -->  
        <url>http://www.clf.com/LICENSE-2.0.txt </url>  
  
        <!--项目分发的主要方式： repo，可以从Maven库下载 manual， 用户必须手动下载和安装依赖 -->  
        <distribution> repo</distribution>  
  
        <!--关于license的补充信息 -->  
        <comments> Abusiness-friendly OSS license </comments>  
  
    </license>  
  
</licenses>  
  
<!--SCM(Source Control Management)标签允许你配置你的代码库，供Maven web站点和其它插件使用。 -->  
<scm>  
  
    <!--SCM的URL,该URL描述了版本库和如何连接到版本库。欲知详情，请看SCMs提供的URL格式和列表。该连接只读。 -->  
    <connection>scm:svn:http://svn.baidu.com/banseon/maven/</connection>  
  
    <!--给开发者使用的，类似connection元素。即该连接不仅仅只读 -->  
    <developerConnection>scm:svn:http://svn.baidu.com/banseon/maven/  
    </developerConnection>  
  
    <!--当前代码的标签，在开发阶段默认为HEAD -->  
    <tag />  
  
    <!--指向项目的可浏览SCM库（例如ViewVC或者Fisheye）的URL。 -->  
    <url> http://svn.baidu.com/banseon</url>  
  
</scm>  
  
<!--描述项目所属组织的各种属性。Maven产生的文档用 -->  
<organization>  
  
    <!--组织的全名 -->  
    <name> demo </name>  
  
    <!--组织主页的URL -->  
    <url> http://www.clf.com/</url>  
  
</organization>  
```


## 聚合和继承

### 继承
在构建多个模块的时候，往往会多有模块有相同的groupId、version，或者有相同的依赖，为了减少pom文件的配置，跟我们的项目中类的继承一样，在父工程中配置了pom，子项目中的pom可以继承.

__可继承的POM元素__

groupId:项目组ID,项目坐标的核心元素
version:项目版本,项目坐标的核心元素
description:项目的描述信息
organnization:项目的组织信息
inceptionYear:项目的创始年份
url:项目的URL地址
developers:项目的开发者信息
dependencies:项目的依赖配置
dependencyManagement:项目的依赖管理配置
repositories:项目的仓库配置
build:包括项目的源码目录配置、输出目录配置、插件配置、插件管理配置等

__继承POM的用法__
面向对象设计中，程序员可以通过一种类的父子结构，在父类中声明一些字段和方法供子类继承，这样可以做到“一处声明、多处使用”，类似的我们需要创建POM的父子结构，然后在父POM中声明一些配置，供子POM继承。

子工程groupid 和version没写,是因为子工程的groupid和version和父工程的一样.所以子工程继承了父工程,但是当子工程的groupid,version和父工程的不一样的时候,就需要自己重写.父模块只是为了帮助消除配置的重复，因此它本身不包含除POM之外的项目文件，也就不需要src/main/java之类的文件夹了。

```xml
<artifactId>integral-kernel-parent</artifactId>
    <!-- 打包的机制，如pom,jar, maven-plugin, ejb, war, ear, rar, par，默认为jar --> 
    <packaging>pom</packaging>

    <parent>
    <groupId>com.dmsdbj.cloud</groupId>
    <artifactId>cloud-integral-parent</artifactId>
    <version>0.0.2-SNAPSHOT</version>
    </parent>
```

在父pom 中定义了整个项目所需要的依赖,如tools等.
```xml
<dependencies>
        <dependency>
            <groupId>com.dmsdbj.cloud</groupId>
            <artifactId>cloud-tool</artifactId>
            <version>0.0.2-SNAPSHOT</version>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>
</dependencies>
```

依赖管理

当多有模块中有相同的依赖时，我们可以将这些依赖提取出来，同一在父POM中声明，这样就可以简化子模块的配置了，但是这样还是存在问题，当想在项目中加入一些，不需要这么多依赖的模块，如果让这个模块也依赖那些不需要的依赖，显然不合理。

Maven提供的dependentcyManagement元素既能让子模块继承到父模块的依赖配置，又能保证子模块依赖使用的灵活度。在dependentcyManagement元素下的依赖声明不会引入实际的依赖，而是定义了依赖的版本,对版本进行同一管理,避免出现版本不一致的情况：

```xml
<dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot-dependencies.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud-dependencies.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
</dependencyManagement>

```

dependencyManagement声明的依赖既不会给项目引入依赖，也不会给它的子模块引入依赖，不过这段配置是会被继承的。真正地引入到项目中是在子项目的pom文件中进行定义声明的.

dependencyManagement声明依赖能够统一规范项目中依赖的版本，当依赖的版本在父POM中声明之后，子模块在使用依赖的时候就无效声明版本，也就不会发生多个子模块使用依赖版本不一致的情况。这可以降低依赖冲突的几率。

3.9.2 聚合
在我们的项目中有controller,service,dao层，每一个里面都有pom文件，在构建的需要把每一个都进行构建，但是有了聚合，我们创建一个额外的模块。然后通过该模块，来构建整个项目的所有模块把他们聚合到一起，能够使用一条命令就构建多个模块，聚合工程的结构如下：

pom文件如下：
```xml
 <parent>
        <artifactId>e3-parent</artifactId>
        <groupId>cn.e3mall</groupId>
        <version>1.0-SNAPSHOT</version>
        <relativePath>../e3parent/pom.xml</relativePath>
    </parent>

    <modelVersion>4.0.0</modelVersion>
    <artifactId>cn-manager</artifactId>
    <version>1.0-SNAPSHOT</version>

    <modules>
        <module>e3-manager-pojo</module>
        <module>e3-manager-dao</module>
        <module>e3-manager-interface</module>
        <module>e3-manager-service</module>
        <module>e3-manager-web</module>
    </modules>
    <packaging>pom</packaging>
```
 

一个特殊的地方就是packaging,其值为pom,如果没有声明的话，默认为jar，对于聚合模块来说，其打包方式必须为pom，否则无法构建。

modules里的每一个module都可以用来指定一个被聚合模块，这里每个module的值都是一个当前pom的相对位置。

3.9.3 继承与聚合的关系

继承是为了减少配置,配置是为了方便快速构建项目.
继承:在子工程的pom 文件中定义元素
聚合:它知道有哪些被聚合的模块，但那些被聚合的子模块不知道这个聚合模块的存在.
为了方便,有的工程既是聚合工程也是父工程. 


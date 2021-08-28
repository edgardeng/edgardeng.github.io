
## 使用XAMPP简单的安装Drupal 
> XAMPP is an easy to install Apache distribution containing MariaDB, PHP, and Perl. Just download and start the installer
 
如果你想快速设置环境，在XAMPP简单的安装Drupal。在Windows机器上（XP和Vista）上，Apache Friends的XAMPP是最简单的方式来获得运行环境的（Apache，PHP和MySQL）。XAMPP在几分钟之内即可安装好，你马上就可以投入开发工作了。

1. 从Apache Friends站点下载XAMPP： www.apachefriends.org/en/xampwindows.html
2. 双击解压XAMPP的zip压缩包，XAMPP会解压缩到一个驱动器(盘符)。在提取目录框中，键入C：\（或点击右边的按钮，选择C：\驱动器）。单击“解压”按钮。
3. 当文件被解压缩提取出来，打开解压缩的文件夹目录，C：\ XAMPP，并运行setup_xampp.bat文件。
4. 双击文件xampp_control.exe，打开XAMPP控制面板。
5. 单击Apache和MySQL的“开始”按钮。
6. 打开网页浏览器，来测试您的XAMPP安装，请在地址栏中。输入http://localhost或http://127.0.0.1。
7. 运行XAMPP服务(Apache或Drupal)。当XAMPP页出现，在左边的语言选项，选择英语。
8. 在左侧的工具栏，点击phpMyAdmin的。创建一个名为Drupal的新数据库：在MySQL连接校验通道（ MySQL Connection Collation），选择UTF8 Unicode。在创建新的数据库，输入Drupal。
一旦你看到提示消息“Drupal的数据库已创建”，请关闭phpMyAdmin。
9. 使用phpMyAdmin查看mysql的用户，为MySQL的“root”用户设置密码
在控制面板中重新启动MySQL，然后单击“停止”MySQL，然后再点击“开始”按钮
10. 解压缩Drupal文件到C：\ XAMPP\ htdocs文件夹中。这会更容易，为了以后使用重命名文件夹为“Drupal”。打开“Drupal”文件夹，在sites/default/下，复制 default.settings.php文件到同一文件夹，并将其重命名为settings.php。用写字板程序打开settings.php文件， 然后添加一行'$db_url = ‘mysql://root:admin@localhost.drupal’。然后向下滚动并输入'$base_url = ‘http://localhost/drupal'。
现在就可以配置对您的Drupal站点进行安装和配置了

### 通过网页配置Drupal

1. 网页浏览器输入 http://localhost/drupal （如果没有配置过会跳到http://localhost/varbase-8.6/core/install.php）
2. choose Language: English 
3. Verify requirements: 
   > 出现PHP OPcode caching解决： 修改php.in,添加zend_extension=C:\XAMPP\php\ext\php_opcache.dll
                                重启Apache
4. Set up database: 提前创建drupal数据库，配置相关用户名密码
5. Install site: 自动填写配置到项目中
6. Configure site: 配置网站 名称、管理员..
7. Multilingual Configuration: 配置多语言
8. Extra Components
9. Assemble extra Components
10. Development tools
11. Assemble development tools
12. Finish translations
    
    Drupal\Core\File\Exception\NotRegularDirectoryException: D:\Applications\xampp\htdocs\varbase-8.6/libraries is not a directory. in Drupal\Core\File\FileSystem->scanDirectory() (line 679 of D:\Applications\xampp\htdocs\varbase-8.6\core\lib\Drupal\Core\File\FileSystem.php).
    
    
    
import os
import argparse

def generate_init(directory, include_all=False, overwrite=False):
    """
    生成__init__.py文件
    
    Args:
        directory: 目标目录路径
        include_all: 是否添加__all__变量
        overwrite: 是否覆盖已存在的__init__.py
    """
    init_path = os.path.join(directory, "__init__.py")
    
    # 检查文件是否已存在
    if os.path.exists(init_path) and not overwrite:
        print(f"⚠️ {init_path} 已存在，跳过生成")
        return
    
    # 收集目录中的模块和子包
    modules = []
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)
        
        # 排除__init__.py自身
        if item == "__init__.py":
            continue
            
        # 处理Python模块
        if item.endswith(".py"):
            module_name = item[:-3]  # 移除.py后缀
            modules.append(module_name)
            
        # 处理子包
        elif os.path.isdir(item_path) and os.path.exists(os.path.join(item_path, "__init__.py")):
            modules.append(item)
    
    # 构建__init__.py内容
    content = []
    if include_all and modules:
        content.append(f"__all__ = {sorted(modules)}")
        content.append("")  # 空行
    
    # 写入文件
    with open(init_path, "w", encoding="utf-8") as f:
        f.write("\n".join(content))
    
    print(f"✅ 已生成 {init_path}")
    if include_all:
        print(f"   包含导出: {sorted(modules)}")

def main():
    parser = argparse.ArgumentParser(description="自动生成__init__.py文件的工具")
    parser.add_argument("directory", nargs="?", default=".", help="目标目录（默认当前目录）")
    parser.add_argument("-a", "--all", action="store_true", help="添加__all__变量，包含所有模块和子包")
    parser.add_argument("-f", "--force", action="store_true", help="强制覆盖已存在的__init__.py")
    
    args = parser.parse_args()
    
    # 验证目录是否存在
    if not os.path.isdir(args.directory):
        print(f"❌ 错误：{args.directory} 不是有效的目录")
        return
    
    generate_init(
        directory=args.directory,
        include_all=args.all,
        overwrite=args.force
    )

if __name__ == "__main__":
    main()
    
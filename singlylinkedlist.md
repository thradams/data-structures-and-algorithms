# Singly Linked List

## Head and Tail

Intrusive

```c
struct book  {
  char title[10];
  struct book * next;
};

struct book_list {
  struct book * head,  *tail;
};
```

Non intrusive

```c
struct book  {
  char title[10];
};

struct book_node {
  struct book * data;
  //or
  struct book data;
  struct book_node* next;
};

struct book_list {
  struct book_node * head,  *tail;
};
```



